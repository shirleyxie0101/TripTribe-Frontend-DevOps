import Box from '@mui/material/Box';

import { MapWithPopup } from '@/components/map/map-with-popup';
import { MapCloseButton } from '@/sections/home/banner-map-toggle/components/CloseButton';

export const BannerMap = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <MapCloseButton />
      <MapWithPopup />
    </Box>
  );
};
