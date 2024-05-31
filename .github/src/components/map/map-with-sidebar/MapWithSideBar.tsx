import { Box, Grid, List, ListItem, Paper, Slide, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { Map } from '@/components/map';
import MapItemCard from '@/components/map/components/MapItemCard';
import { MapPins } from '@/components/map/components/MapPins';
import { useMapStore } from '@/stores/map-store';
import { Location } from '@/types/address';
import { PlaceProps } from '@/types/attractions-restaurants';

// const LazyMapItemCard = lazy(() => import('@/components/map/components/MapItemCard'));
export const MapWithSideBar = () => {
  const { updateMapCenter, updateHighLightedId, pinInfo, popupInfo } = useMapStore(
    (state) => state
  );
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const listRef = useRef<HTMLUListElement>(null);

  const handleOnHover = (id: string) => {
    updateHighLightedId(id);
  };
  const handleOffHover = (id: string) => {
    updateHighLightedId('');
  };
  const handleSideBarClick = (location: Location) => {
    updateMapCenter(location);
  };

  // prettier-ignore
  const handleScroll = useCallback<(popupInfo: PlaceProps | null) => void>(
    (popupInfo) => {
      if (!popupInfo) return;
      const clickPinId = popupInfo?.type + popupInfo?._id;
      const listItem = document.getElementById('list' + clickPinId);

      if (!listItem) return;
      if (!listRef.current) return;

      if (isDesktop) {
        const scrollTop = listItem.offsetTop - listRef.current.offsetTop;
        listRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
      } else {
        const scrollLeft = listItem.offsetLeft - listRef.current.offsetLeft - 10; // some space pix on left of a card
        listRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    },
  [isDesktop]
  );

  const sortedPinInfo = pinInfo.sort((a, b) => {
    if (a.distance && b.distance) {
      return a.distance - b.distance;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    handleScroll(popupInfo);
  }, [handleScroll, popupInfo]);

  const responsiveListStyle = isDesktop
    ? {
        bottom: 'auto',
        top: 0,
        overflowX: 'visible',
        overflowY: 'scroll',
        height: '100svh',
        width: 'auto',
      }
    : {
        bottom: 0,
        top: 'auto',
        overflowX: 'scroll',
        overflowY: 'visible',
        height: 'auto',
        width: '100svw',
      };

  const SideBarListItem = useMemo(() => {
    return (
      <React.Fragment>
        {sortedPinInfo.map((item, index) => {
          return (
            <Slide
              direction="right"
              in={!!item}
              mountOnEnter
              unmountOnExit
              key={item.type + item._id}
              id={'list' + item.type + item._id}
            >
              <ListItem disablePadding>
                <Paper
                  // sx={{  }}
                  elevation={1}
                  sx={{ marginY: 0.375, marginX: 0.375, width: 360 }}
                  onMouseEnter={() => handleOnHover(`${item.type}-${item._id}`)}
                  onMouseLeave={() => handleOffHover(`${item.type}-${item._id}`)}
                  onClick={() => handleSideBarClick(item.address.location)}
                >
                  <MapItemCard popupInfo={item} />
                </Paper>
              </ListItem>
            </Slide>
          );
        })}
      </React.Fragment>
    );
  }, [pinInfo]);

  return (
    <Box>
      <Grid
        id="MapWithSideBar"
        container
        height={'100svh'}
        bgcolor={'white'}
        position={'relative'}
      >
        <Box
          position={'absolute'}
          sx={{
            ...responsiveListStyle,
            zIndex: 99999,
            bgcolor: 'white',
            // backgroundImage: 'url(/assets/map-sidebar-bkg2.jpg)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          ref={listRef}
        >
          <List
            disablePadding
            sx={isDesktop ? { display: 'block' } : { display: 'flex', flexWrap: 'nowrap' }}
          >
            {pinInfo.length ? SideBarListItem : <></>}
          </List>
        </Box>
        <Grid
          item
          xs={12}
          sx={{ transition: '0.5s all' }}
        >
          <Map
            sx={{ height: '100%' }}
            mapId="RestaurantAttractionMap"
            fullScreenLocation="bottom-right"
            naviControlLocation="bottom-right"
          >
            <MapPins />
          </Map>
        </Grid>
      </Grid>
    </Box>
  );
};
