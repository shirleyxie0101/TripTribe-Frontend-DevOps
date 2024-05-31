import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { enqueueSnackbar } from 'notistack';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import MapGL, {
  FullscreenControl,
  GeolocateControl,
  MapRef,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';
import { ControlPosition, MapInstance, ViewStateChangeEvent } from 'react-map-gl/dist/esm/types';
import useSWR from 'swr';

import { useDebounce } from '@/hooks/use-debounce';
import useRequest from '@/hooks/use-request';
import { useMapStore } from '@/stores/map-store';
import { Location } from '@/types/address';
import { PlacesData } from '@/types/map';
import axiosInstance from '@/utils/request';

import { zoomToDistance, zoomToLimit } from './utils/distance-and-limit';
import { getLocation } from './utils/get-location';

type MapProps = {
  mapId: string;
  sx?: SxProps | SxProps<any>;
  fullScreenLocation?: ControlPosition;
  naviControlLocation?: ControlPosition;
  // fetchData: HomepageMapFetchData;
  children?: ReactNode;
};
export const Map: React.FC<MapProps> = ({
  sx,
  mapId,
  fullScreenLocation = 'top-left',
  naviControlLocation = 'top-left',
  children,
}) => {
  const {
    maxDistance,
    mapCenter,
    updateMaxDistance,
    updateMapCenter,
    zoom,
    updateZoom,
    updatePinInfo,
  } = useMapStore((state) => state);

  const defaultLocation: Location = { lng: 0, lat: 0 }; //melbourne
  const [geoLocationData, setGeoLocationData] = useState<Location>(mapCenter || defaultLocation);
  const limit = zoomToLimit(zoom);

  const mapRef = useRef<MapRef | null>(null);

  const TOKEN = process.env.NEXT_PUBLIC_MAP_API_KEY;
  if (!TOKEN) {
    throw new Error('no valid map token');
  }
  const initialZoom = 11;
  const requestOptions = {
    url: '/search/globalSearch',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      keyword: '',
      limit: limit,
      maxDistance: maxDistance,
      location: mapCenter ?? defaultLocation,
    },
  };

  const { data, error, isLoading, mutate } = useRequest<PlacesData>(requestOptions);

  useEffect(() => {
    if (data) {
      // sort data by distance
      data.sort((a, b) => {
        if (a.distance && b.distance) {
          return a.distance - b.distance;
        } else return 0;
      });

      console.log(data);
      // add data to state
      updatePinInfo(data);
    }
  }, [data, updatePinInfo]);

  // update max distance when map start
  useEffect(() => {
    // const maxDistance = zoomToDistance(zoom);
    handleMaxDistanceChange(zoom);
  }, []);

  // ask for user geolocation
  useEffect(() => {
    const handleLocation = async () => {
      setGeoLocationData(await getLocation(mapCenter || { lng: 0, lat: 0 }));
    };
    handleLocation();
  }, [getLocation]);

  // no geolocation -> user allow geolocation -> move to geolocation
  useEffect(() => {
    updateMapCenter(geoLocationData);
    mapRef.current?.setCenter(geoLocationData);
  }, []);

  // sidebar map click to fly to pin center
  useEffect(() => {
    handleMoveMap(mapCenter);
  }, [mapCenter]);
  if (isLoading) {
    enqueueSnackbar('Loading Content', {
      variant: 'info',
      preventDuplicate: true,
      autoHideDuration: 1000,
    });
  }
  // get map center when drag end.
  // debounce for delay useSwr trigger .
  const handleMapCenter = () => {
    if (mapRef.current?.getCenter()) {
      updateMapCenter(mapRef.current?.getCenter());
    }
  };
  const debounceCenter = useDebounce(handleMapCenter, 700);
  // update distance and limit when drag end
  const handleMaxDistanceChange = (zoom: number) => {
    const maxDistance = zoomToDistance(zoom);
    updateMaxDistance(maxDistance);
  };
  const debounceDistance = useDebounce(handleMaxDistanceChange, 700);
  // handle above two debounce
  const handleMapChange = (zoom: number) => {
    debounceCenter();
    debounceDistance(zoom);
  };

  // geolocation control, cancel animation
  const handleMoveMap = useCallback((location: Location) => {
    // updateMapCenter(location);
    mapRef.current?.flyTo({ center: location, duration: 0 });
  }, []);

  // set zoom
  const handleZoom = (e: ViewStateChangeEvent<MapInstance>) => {
    updateZoom(e.viewState.zoom);
  };
  return (
    <Box
      sx={{ ...sx, position: 'relative' }}
      id={mapId}
      className="ReactMapGl"
      aria-label="Map Container"
    >
      <MapGL
        ref={mapRef}
        initialViewState={{
          longitude: mapCenter ? mapCenter.lng : geoLocationData.lng,
          latitude: mapCenter ? mapCenter.lat : geoLocationData.lat,
          zoom: zoom || initialZoom,
          bearing: 0,
          pitch: 0,
        }}
        pitchWithRotate={false}
        dragRotate={false}
        touchZoomRotate={false}
        minZoom={2.5}
        onZoomEnd={(e) => {
          handleZoom(e);
          handleMapChange(zoom);
        }}
        onDragEnd={() => {
          handleMapChange(zoom);
        }}
        mapStyle="mapbox://styles/triptribe/clp18ys6w00cb01pq0t4c029g"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl
          onGeolocate={() => handleMoveMap(geoLocationData)}
          position="top-left"
        />
        <FullscreenControl position={fullScreenLocation} />
        <NavigationControl position={naviControlLocation} />
        <ScaleControl />

        {children}
      </MapGL>
    </Box>
  );
};
