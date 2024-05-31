import { Box, Chip, styled } from '@mui/material';
import { FC } from 'react';

import { FilterChipData } from '@/types/general';

interface FilterChipsProps {
  chipData: FilterChipData[];
  handleFilterChipsDelete: (chipToDelete: FilterChipData) => () => void;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const FilterChips: FC<FilterChipsProps> = ({ chipData, handleFilterChipsDelete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleFilterChipsDelete(data)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
};

export default FilterChips;
