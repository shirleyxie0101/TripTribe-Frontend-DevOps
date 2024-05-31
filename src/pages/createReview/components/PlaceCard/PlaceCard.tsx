import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';

type PlaceCardProps = {
  isMediumScreen: boolean;
  placeInfo?: {
    name: string;
    image: {
      src: string;
      alt: string;
    };
    address: {
      formattedAddress: string;
    };
  };
  onNavigateBack: () => void;
};

const PlaceCard: FC<PlaceCardProps> = ({
  onNavigateBack,
  isMediumScreen,
  placeInfo = { name: '', image: { src: '', alt: '' }, address: { formattedAddress: '' } },
}) => {
  if (!placeInfo) {
    // Handle the case when placeInfo is undefined
    return <div>No information available</div>;
  }
  const { name, image, address } = placeInfo;

  return (
    <Grid
      container
      justifyContent="center"
      spacing={4}
    >
      <Grid
        item
        xs={12}
        order={isMediumScreen ? 1 : 2}
        sx={{ textAlign: 'center' }}
      >
        <Typography
          variant="h4"
          color="initial"
          fontWeight="bold"
        >
          Tell us, how was your visit?
        </Typography>
      </Grid>
      <Grid
        item
        xs={isMediumScreen ? 8 : 12}
        order={isMediumScreen ? 2 : 1}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: isMediumScreen ? 'column' : 'row',
            cursor: 'pointer',
            ':hover': {
              cursor: 'pointer',
              backgroundColor: '#e0e0e0',
            },
          }}
          onClick={onNavigateBack}
        >
          <Box
            component="img"
            src={image.src}
            alt={image.alt}
            sx={{
              width: isMediumScreen ? '100%' : '160px',
              height: 'auto',
            }}
          />
          <Box sx={{ ml: isMediumScreen ? 0 : '30px' }}>
            <Typography variant="h5">{name}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {address.formattedAddress}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PlaceCard;
