import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';

import { CircularLoading } from '@/components/CircularLoading';
import useRouterQuery from '@/hooks/use-router-query';
import { NaviTopSearchBar } from '@/layouts/MainLayout/HeaderLayout/navi-top-search-bar';

export const HeroBanner: React.FC = () => {
  const { setUrlQuery } = useRouterQuery();
  const [mapLoading, setMapLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const toggleMapLoading = () => {
    setMapLoading(true);
  };

  setTimeout(() => {
    setShown(true);
  }, 300);

  return (
    <Stack
      pt={12}
      direction={'column'}
      spacing={8}
      // maxWidth="lg"
      height={450}
      // marginX={'auto'}
      my={4}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
    >
      <Box
        position={'absolute'}
        width={1}
        height={1}
        left={0}
        top={0}
        sx={{ opacity: shown ? 1 : 0, transition: '0.5s', overflow: 'hidden' }}
      >
        <img
          aria-label="Banner Image"
          src="/assets/bridge.png"
          alt="Sydney Opera"
          object-fit="cover"
          // onLoad={() => setShown(true)}
        />
      </Box>

      <NaviTopSearchBar
        id="heroBannerSearchBar"
        sx={{
          width: '70%',
          bgcolor: 'white',
          borderRadius: '50px',
          zIndex: '2',
          overflow: 'hidden',
        }}
        text={'Search'}
      />
      <Box position={'relative'}>
        <Button
          color="secondary"
          variant="contained"
          sx={{
            width: 169,
            height: 55,
          }}
          LinkComponent={NextLink}
          // href="?map=shown"
          onClick={() => {
            setUrlQuery({ map: 'shown' });
            toggleMapLoading();
          }}
          disabled={mapLoading}
        >
          Map View
        </Button>
        {mapLoading && <CircularLoading size={40} />}
      </Box>
    </Stack>
  );
};
