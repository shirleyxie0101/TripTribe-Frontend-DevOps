import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';

import { sortOptions } from '@/constants/sort-options';
import { usePopover } from '@/hooks/use-popover';
import useRouterQuery from '@/hooks/use-router-query';
import { QueryParamsSchema, QueryParamsType } from '@/types/general';

interface FilterSortButtonProps {
  handleFiltersToggle: () => void;
  setQueryParams: Dispatch<SetStateAction<QueryParamsType>>;
}

const FilterSortButton: FC<FilterSortButtonProps> = ({ handleFiltersToggle, setQueryParams }) => {
  const popover = usePopover<HTMLButtonElement>();
  const { urlQuery } = useRouterQuery<QueryParamsType>();
  const sortValue = QueryParamsSchema.parse(urlQuery).sort;

  const handleClick = (option: string) => {
    setQueryParams((prev) => ({
      ...prev,
      sort: option,
    }));
    popover.handleClose();
  };

  return (
    <Grid container>
      <Grid
        item
        xs={6}
      >
        <Box sx={{ width: '99%' }}>
          <Button
            variant="outlined"
            onClick={handleFiltersToggle}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            fullWidth
          >
            <Typography>Filter</Typography>
            <FilterListIcon />
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <Box sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            onClick={popover.handleOpen}
            ref={popover.anchorRef}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            fullWidth
          >
            <Typography>{sortValue}</Typography>

            <SortIcon />
          </Button>
        </Box>
        <Menu
          anchorEl={popover.anchorRef.current}
          onClose={popover.handleClose}
          open={popover.open}
        >
          {sortOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
              onClick={() => handleClick(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default FilterSortButton;
