import { Button, Card, CardMedia } from '@mui/material';
import React from 'react';
// const path = '';
const image = '/assets/list-page-map.jpeg';
const HeroMap = ({
  mapIsOpen,
  toggleMapIsOpen,
}: {
  mapIsOpen: boolean;
  toggleMapIsOpen: (state: boolean) => void;
}) => {
  return (
    <Card
      elevation={2}
      sx={{ borderRadius: 1, height: '100%', width: '100%' }}
    >
      <CardMedia
        // component={RouterLink}
        // href={path}
        image={image}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          textDecoration: 'none',
        }}
      >
        <Button
          variant="contained"
          onClick={() => toggleMapIsOpen(true)}
        >
          Map View
        </Button>
      </CardMedia>
    </Card>
  );
};

export default HeroMap;
