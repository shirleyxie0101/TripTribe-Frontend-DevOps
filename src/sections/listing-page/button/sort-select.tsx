import { Box, MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, FC, SetStateAction } from 'react';

import { sortOptions } from '@/constants/sort-options';
import useRouterQuery from '@/hooks/use-router-query';
import { QueryParamsSchema, QueryParamsType } from '@/types/general';

interface SortSelectProps {
  setQueryParams: Dispatch<SetStateAction<QueryParamsType>>;
}

const SortSelect: FC<SortSelectProps> = ({ setQueryParams }) => {
  const { urlQuery } = useRouterQuery<QueryParamsType>();
  const sortValue = QueryParamsSchema.parse(urlQuery).sort;

  const handleChange = (event: SelectChangeEvent) => {
    setQueryParams((prev) => ({
      ...prev,
      sort: event.target.value as string,
    }));
  };

  return (
    <Box sx={{ minWidth: 150, display: 'flex', flexDirection: 'row' }}>
      <FormControl
        fullWidth
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Typography>Sort by:&nbsp;&nbsp; </Typography>
        <Select
          sx={{ minWidth: 100 }}
          defaultValue={sortOptions[0]}
          value={sortValue ?? sortOptions[0]}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          size="small"
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
    </Box>
  );
};

export default SortSelect;
