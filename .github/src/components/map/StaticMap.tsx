import React from 'react';

import { StaticMapProps, staticMapUrlGenerator } from '@/utils/static-map-url-generator';

export const StaticMap: React.FC<StaticMapProps> = ({
  mapCenter,
  zoom = 11,
  width = 999,
  height = 999,
}) => {
  const staticMapUrl = staticMapUrlGenerator({ mapCenter, zoom, width, height });
  return (
    <img
      alt="Static Map"
      src={staticMapUrl}
    />
  );
};
