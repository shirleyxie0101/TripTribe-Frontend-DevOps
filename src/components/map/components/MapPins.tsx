import React, { useCallback, useMemo, useState } from 'react';
import { Marker } from 'react-map-gl';
import { MarkerEvent } from 'react-map-gl/dist/esm/types';

import Pin from '@/components/map/components/individualPin';
import { useMapStore } from '@/stores/map-store';
import { PlaceProps } from '@/types/attractions-restaurants';

import { pinIconColor, pinIconList } from './pinIconProps';

export const MapPins: React.FC = () => {
  const { highLightedId, pinInfo, updatePopupInfo } = useMapStore((state) => state);

  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);

  const handleMarkerClick = useCallback(
    (e: MarkerEvent<mapboxgl.Marker, MouseEvent>, place: PlaceProps) => {
      if (e.target.getLngLat().lat !== markerLat && e.target.getLngLat().lng !== markerLng) {
        setMarkerLng(() => e.target.getLngLat().lng);
        setMarkerLat(() => e.target.getLngLat().lat);
      }
      e.originalEvent.stopPropagation();
      updatePopupInfo(place);
    },
    [markerLat, markerLng, updatePopupInfo]
  );

  const pins = useMemo(() => {
    if (pinInfo.length == 0) {
      return;
    } else {
      return pinInfo.map((place: PlaceProps) => (
        <React.Fragment key={`marker-${place.type}-${place._id}`}>
          <Marker
            longitude={place.address.location.lng}
            latitude={place.address.location.lat}
            anchor="bottom"
            onClick={(e) => handleMarkerClick(e, place)}
          >
            <Pin
              id={`marker-${place.type}-${place._id}`}
              placeType={place.type}
              placeIcon={pinIconList[place.type]}
              placeColor={
                highLightedId === `${place.type}-${place._id}`
                  ? pinIconColor.Selected
                  : pinIconColor[place.type]
              }
            ></Pin>
          </Marker>
        </React.Fragment>
      ));
    }
  }, [pinInfo, handleMarkerClick, highLightedId]);

  return pins;
};
