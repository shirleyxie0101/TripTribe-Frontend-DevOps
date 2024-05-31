import React, { useEffect, useState } from 'react';

import useRouterQuery from '@/hooks/use-router-query';
import { HeroBanner } from '@/sections/home/banner-map-toggle/components';
import { BannerMap } from '@/sections/home/banner-map-toggle/components/banner-map';

type BannerMapToggleProps = {
  mapQueryShown: boolean;
};

export const BannerMapToggle: React.FC<BannerMapToggleProps> = ({ mapQueryShown }) => {
  const [showMap, setShowMap] = useState<boolean>(mapQueryShown);
  const { urlQuery } = useRouterQuery();

  useEffect(() => {
    if (urlQuery['map'] === 'shown') {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [urlQuery]);
  return showMap ? <BannerMap /> : <HeroBanner />;
};
