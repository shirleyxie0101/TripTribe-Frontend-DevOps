import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import React, { useMemo } from 'react';
import type { ChangeEvent, FC, MouseEvent } from 'react';

import { RouterLink } from '@/components/router-link';
import { Scrollbar } from '@/components/scrollbar';
import { useSelection } from '@/hooks/use-selection';
import { paths } from '@/paths';
import { getInitials } from '@/utils/get-initials';
// TODO : fetch listing data and pagination
const mockPlaces = [
  { id: '1', name: 'A', location: 'location', rating: 3, description: 'short description' },
  { id: '2', name: 'B', location: 'location', rating: 3, description: 'short description' },
  { id: '3', name: 'C', location: 'location', rating: 3, description: 'short description' },
  { id: '4', name: 'D', location: 'location', rating: 3, description: 'short description' },
  { id: '5', name: 'E', location: 'location', rating: 3, description: 'short description' },
];

type PlaceListTableProps = {
  handlePageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handlePageSizeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  pageSize: number;
};

const usePlacesIds = (places: { id: string; name: string }[]) => {
  return useMemo(() => {
    return places.map((place) => place.id);
  }, [places]);
};

const PlaceListTable: FC<PlaceListTableProps> = ({
  handlePageChange,
  handlePageSizeChange,
  page,
  pageSize,
}) => {
  const placesIds = usePlacesIds(mockPlaces);
  const placesSelection = useSelection<string>(placesIds);
  const {
    selected,
    handleSelectAll: onSelectAll,
    handleSelectOne: onSelectOne,
    handleDeselectAll: onDeselectAll,
    handleDeselectOne: onDeselectOne,
  } = placesSelection;

  const selectedSome = selected.length > 0 && selected.length < mockPlaces.length;
  const selectedAll = mockPlaces.length > 0 && selected.length === mockPlaces.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box sx={{ position: 'relative' }}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            display: enableBulkActions ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectAll?.();
              } else {
                onDeselectAll?.();
              }
            }}
          />
          <Button
            color="inherit"
            size="small"
          >
            Delete
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: '700px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPlaces.map((place) => {
              const isSelected = selected.includes(place.id);
              const location = place.location;
              const rating = `${place.rating} / 5`;
              const description = place.description;
              return (
                <TableRow
                  hover
                  key={place.id}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                        if (event.target.checked) {
                          onSelectOne?.(place.id);
                        } else {
                          onDeselectOne?.(place.id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Avatar
                        src={''}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(place.name)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          href={paths.index}
                          variant="subtitle2"
                        >
                          {place.name}
                        </Link>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          {place.id}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>{rating}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{description}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* TODO: href need to be changed to edit page url in the future */}
                    <IconButton
                      component={RouterLink}
                      href={paths.index}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    {/* TODO: href need to be changed to detail page url in the future */}
                    <IconButton
                      component={RouterLink}
                      href={paths.index}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={50}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        page={page}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default PlaceListTable;
