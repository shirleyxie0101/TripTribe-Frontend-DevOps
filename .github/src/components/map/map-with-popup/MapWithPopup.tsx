import React from 'react';

import { MapPins } from '@/components/map/components/MapPins';
import { MapPopUp } from '@/components/map/components/popup';
import { useMapStore } from '@/stores/map-store';

import { Map } from '../map';
export const MapWithPopup = () => {
  const popupInfo = useMapStore((state) => state.popupInfo);

  return (
    <Map
      sx={{ height: 600 }}
      mapId="bannerMap"
    >
      <React.Fragment>
        <MapPins />
        {popupInfo && <MapPopUp />}
      </React.Fragment>
    </Map>
  );
};
