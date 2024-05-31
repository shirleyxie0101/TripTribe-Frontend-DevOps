import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import theme from '@/styles/theme';
export const pinIconList = {
  Restaurant: <RestaurantMenuIcon />,
  Restaurants: <RestaurantMenuIcon />,
  Attraction: <PhotoCameraOutlinedIcon />,
  Attractions: <PhotoCameraOutlinedIcon />,
};
export const pinIconColor = {
  Restaurant: theme.palette.secondary.light,
  Attraction: theme.palette.primary.main,
  Restaurants: theme.palette.secondary.light,
  Attractions: theme.palette.primary.main,
  Selected: 'red',
};
