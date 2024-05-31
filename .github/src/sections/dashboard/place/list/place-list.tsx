import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  SelectChangeEvent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { FC, useCallback, useEffect, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

import { capitalizeFirstLetter } from '@/utils/cap-string-first-letter';
import { getInitials } from '@/utils/get-initials';

import PlaceListFilter from './components/place-list-filter';
import PlaceListSearch from './components/place-list-search';
import PlaceListTable from './components/place-list-table';

type AdminPlaceListProps = {
  placeType: string;
};

export type AdminPlaceFilter = {
  meal?: string[] | undefined;
  cuisine?: string[] | undefined;
  duration?: string[] | undefined;
  type?: string[] | undefined;
  cost: number[] | undefined;
};

type AdminPlaceListState = {
  filter: AdminPlaceFilter;
  sort: string;
  page: number;
  pageSize: number;
};

export type Chip = {
  label: string;
  value: string;
};

const PlaceList: FC<AdminPlaceListProps> = ({ placeType }) => {
  const [state, setState] = useState<AdminPlaceListState>({
    filter: {
      meal: undefined,
      cuisine: undefined,
      type: undefined,
      cost: undefined,
    },
    sort: 'Rating: Hight to low',
    page: 1,
    pageSize: 5,
  });
  console.log('admin place state', state);

  const [chips, setChips] = useState<Chip[]>([]);
  console.log('chips', chips);
  const handleSortChange = useCallback((event: SelectChangeEvent<string>): void => {
    setState((prevState) => ({
      ...prevState,
      sort: event.target.value,
    }));
  }, []);

  const handleFilterChange = useCallback(
    (filterCategory: string, values: Array<string | number>) => {
      setState((prevState) => {
        const newFilter = {
          ...prevState.filter,
          [filterCategory]: values,
        };
        return {
          ...prevState,
          filter: newFilter,
        };
      });
      setChips((prevState) => {
        const newChips: Chip[] = [...prevState];
        const prevChipsValues = prevState.map((prevState) => prevState.value);
        values.forEach((value) => {
          if (prevChipsValues.includes(value.toString())) return;
          newChips.push({
            label: capitalizeFirstLetter(value.toString()),
            value: value.toString(),
          });
        });
        return newChips;
      });
    },
    []
  );

  const handleDeleteChips = useCallback((deletedChip: Chip): void => {
    setChips((prevChips) => {
      return prevChips.filter((chip) => {
        return !(deletedChip.value === chip.value);
      });
    });
  }, []);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handlePageSizeChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      pageSize: parseInt(event.target.value, 10),
    }));
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Typography variant="h4">{placeType.toUpperCase()}</Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <PlaceListSearch
                sort={state.sort}
                handleSortChange={handleSortChange}
              />
              <Divider />
              <PlaceListFilter
                placeType={placeType}
                filter={state.filter}
                handleFilterChange={handleFilterChange}
                chips={chips}
                handleDeleteChip={handleDeleteChips}
              />
              <PlaceListTable
                page={state.page}
                pageSize={state.pageSize}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default PlaceList;
