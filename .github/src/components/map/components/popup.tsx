import React from 'react';
import { Popup } from 'react-map-gl';

import MapItemCard from '@/components/map/components/MapItemCard';
import { useMapStore } from '@/stores/map-store';

export const MapPopUp: React.FC = () => {
  const { popupInfo, updatePopupInfo } = useMapStore((state) => state);

  const handlePopupInfo = () => {
    updatePopupInfo(null);
  };
  if (popupInfo) {
    return (
      <Popup
        anchor="bottom"
        longitude={Number(popupInfo.address.location.lng)}
        latitude={Number(popupInfo.address.location.lat)}
        onClose={handlePopupInfo}
        maxWidth="240px"
        offset={50}
      >
        <MapItemCard popupInfo={popupInfo} />
      </Popup>
    );
  }
};
