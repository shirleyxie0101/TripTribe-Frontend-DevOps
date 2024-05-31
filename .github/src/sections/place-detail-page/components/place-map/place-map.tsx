import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Button, Fade, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { StaticMap } from '@/components/map';
import { MapWithSideBarModal } from '@/components/map/map-with-sidebar';
import { useMapStore } from '@/stores/map-store';
import { PlaceProps } from '@/types/attractions-restaurants';

type PlaceMapProps = {
  placeData: PlaceProps;
};

export const PlaceMap: React.FC<PlaceMapProps> = ({ placeData }) => {
  const { ref, inView, entry } = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);
  const updateMapCenter = useMapStore((state) => state.updateMapCenter);
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const borderColor = grey[500];

  const handleMapOpen = (state: boolean) => {
    updateMapCenter(placeData.address.location);
    setMapIsOpen(state);
  };
  const mapWidth = 552;
  const mapHeight = 225;
  return (
    <Fade
      in={show}
      timeout={1100}
    >
      <Box
        ref={ref}
        left={'50%'}
        top={'50%'}
        sx={{ transform: 'translate(-50% ,-50%)', borderColor: borderColor }}
        width={mapWidth}
        height={mapHeight}
        position={'absolute'}
      >
        <StaticMap
          width={mapWidth}
          height={mapHeight}
          mapCenter={placeData.address.location}
        />
        <Button
          sx={{
            bgcolor: 'white',
            border: '3px solid',
            borderColor: borderColor,
            fontSize: '1.75rem',
            padding: 1,
            borderRadius: 20,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50% ,-50%)',
            '&:hover': { bgcolor: 'white' },
          }}
          onClick={() => handleMapOpen(true)}
        >
          <LocationOnOutlinedIcon sx={{ mx: 1 }} />
          <Typography sx={{ mr: 1, fontSize: '1.25rem' }}>View map</Typography>
        </Button>
        <MapWithSideBarModal
          mapIsOpen={mapIsOpen}
          toggleMapIsOpen={handleMapOpen}
        />
      </Box>
    </Fade>
  );
};
