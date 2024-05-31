import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  SvgIcon,
} from '@mui/material';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import React, { FC } from 'react';

import { sortOptions } from '@/constants/sort-options';

type PlaceListSearchProps = {
  sort: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
};
const PlaceListSearch: FC<PlaceListSearchProps> = ({ sort, handleSortChange }) => {
  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box
          component="form"
          //   onSubmit={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search places"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            label="Sort By"
            name="sort"
            sx={{ minWidth: 100 }}
            onChange={handleSortChange}
            value={sort}
          >
            {sortOptions.map((option, index) => (
              <MenuItem
                key={index}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default PlaceListSearch;
