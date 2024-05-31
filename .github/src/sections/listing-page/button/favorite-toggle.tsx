import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { FC } from 'react';
interface FavoriteToggleProps {
  outlineColor: string;
  checkedColor: string;
}
const label = { inputProps: { 'aria-label': 'Checkbox-favorite' } };

const FavoriteToggle: FC<FavoriteToggleProps> = ({ outlineColor, checkedColor }) => {
  return (
    <Checkbox
      sx={{
        color: outlineColor,
        '&.Mui-checked': {
          color: checkedColor,
        },
      }}
      {...label}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
    />
  );
};

export default FavoriteToggle;
