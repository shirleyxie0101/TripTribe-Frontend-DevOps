import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

import { attractionOptions, dollarMarks, durationOptions, mealOptions } from '@/constants/filter';

import type { Chip as ChipType } from './../place-list';
import { MultiSelect } from '../../../components/multi-select';
import { AdminPlaceFilter } from '../place-list';

type PlaceListFilterProps = {
  placeType: string;
  filter: AdminPlaceFilter;
  handleFilterChange: (filterCategory: string, value: Array<string | number>) => void;
  chips: ChipType[];
  handleDeleteChip: (chip: ChipType) => void;
};

const PlaceListFilter: FC<PlaceListFilterProps> = ({
  placeType,
  filter,
  handleFilterChange,
  chips,
  handleDeleteChip,
}) => {
  const isAttraction = placeType === 'attraction';

  // TODO: filter & chips function

  return (
    <div className="p-1">
      {chips.length > 0 ? (
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={1}
          sx={{ p: 2 }}
        >
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    '& span': {
                      fontWeight: 600,
                    },
                  }}
                >
                  {chip.label}
                </Box>
              }
              onDelete={() => handleDeleteChip(chip)}
              variant="outlined"
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2.5 }}>
          <Typography
            color="text.secondary"
            variant="subtitle2"
          >
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ p: 1 }}
      >
        <MultiSelect
          label={isAttraction ? 'Duration' : 'Meal'}
          onChange={handleFilterChange}
          options={isAttraction ? durationOptions : mealOptions}
          value={isAttraction ? filter.duration : filter.meal}
        />
        <MultiSelect
          label={isAttraction ? 'Type' : 'Cuisine'}
          onChange={handleFilterChange}
          options={isAttraction ? attractionOptions : mealOptions}
          value={isAttraction ? filter.type : filter.cuisine}
        />
        <MultiSelect
          label="Cost"
          onChange={handleFilterChange}
          options={dollarMarks}
          value={filter.cost}
        />
      </Stack>
    </div>
  );
};

export default PlaceListFilter;
