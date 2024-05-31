import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { FC } from 'react';

export const PlacesTab: FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', width: 400 }}>
      <Button
        component={NextLink}
        href={'/restaurants'}
        variant="text"
        color="primary"
      >
        <Typography
          variant="subtitle1"
          fontSize="1.2rem"
        >
          Restaurants
        </Typography>
      </Button>
      <Button
        component={NextLink}
        href={'/attractions'}
        variant="text"
        color="primary"
      >
        <Typography
          variant="subtitle1"
          fontSize="1.2rem"
        >
          Attractions
        </Typography>
      </Button>
    </Box>
  );
};
