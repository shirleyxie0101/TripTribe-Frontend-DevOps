import { Box, Card, CircularProgress, Pagination, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { MapWithSideBarModal } from '@/components/map/map-with-sidebar';
import PlaceCard from '@/components/PlaceCard';
import { DEFAULT_LISTING_PAGE_SIZE } from '@/constants/pagination';
import useRequest from '@/hooks/use-request';
import useRouterQuery from '@/hooks/use-router-query';
import SideDrawer from '@/sections/listing-page/side-drawer';
import theme from '@/styles/theme';
import {
  FilterChipData,
  FilterQueryParams,
  FilterQueryParamsSchema,
  ListingInfoBasic,
  MainType,
  PageDataResponse,
  QueryParamsSchema,
  QueryParamsType,
} from '@/types/general';
import { convertQueryObject, convertSort } from '@/utils/listing-page-request-converter';
import paginationCalculation from '@/utils/pagination-calculation';

import FilterSortButton from './button/filter-sort-button';
import HeroMap from './button/hero-map-button';
import SortSelect from './button/sort-select';
import ViewToggleButton from './button/view-toggle-button';
import Filter from './filter';
import FilterChips from './filter-chips';
import FilterMatchInfo from './filter-match-info';
import ListingList from './listing-list';

interface MainPageProps {
  type: MainType;
}

// reusable page component for listing restaurant and attraction (not including the app header)
const MainPage: FC<MainPageProps> = ({ type }) => {
  //url query params state
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    pageNumber: 1,
    distance: 0,
    cost: 0,
    open: false,
  });
  const { pageNumber } = queryParams;

  //setQueryParams for the first time enter the page
  const { isRouterReady, urlQuery, setUrlQuery } = useRouterQuery<QueryParamsType>();
  const parsedUrlQuery = QueryParamsSchema.parse(urlQuery);
  useEffect(() => {
    if (!isRouterReady) {
      return;
    }
    setQueryParams(parsedUrlQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRouterReady]);

  //set url on queryParams change
  useEffect(() => {
    if (!isRouterReady) {
      return;
    }
    setUrlQuery(queryParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRouterReady, JSON.stringify(queryParams)]);

  //request listing data
  const sortValue = queryParams && queryParams.sort ? convertSort(queryParams.sort) : 'rating_desc';
  const filters = convertQueryObject(queryParams);
  const requestBody = {
    limit: DEFAULT_LISTING_PAGE_SIZE,
    skip: (pageNumber - 1) * DEFAULT_LISTING_PAGE_SIZE,
    sort: sortValue,
    filters,
  };
  const { queryPath } = useRouterQuery();
  const resourceType = type === MainType.Restaurant ? 'restaurants' : 'attractions';
  const listingDataRequest = {
    url: `/${resourceType}`,
    params: requestBody,
    isAbortWhenUnmount: true,
  };
  const { data: respondData, isLoading } = useRequest<PageDataResponse<ListingInfoBasic[]>>(
    queryPath ? listingDataRequest : null
  );
  const { data = [], total = 0 } = respondData || {};

  // get chipData: parsed from queryParams ->show chips
  const chipData: FilterChipData[] = [];
  const filterChipData = FilterQueryParamsSchema.parse(queryParams);
  for (const [key, value] of Object.entries(filterChipData)) {
    if (value === undefined || value === 0 || value == false) {
      continue;
    }
    if (Array.isArray(value)) {
      value.map((item) =>
        chipData.push({
          key: item,
          label: item,
          type: key as keyof FilterQueryParams,
        })
      );
    } else {
      chipData.push({
        key: key,
        label: `${key}: ${value.toString()}`,
        type: key as keyof FilterQueryParams,
      });
    }
  }

  //delete chips : undefined it from queryParams(so url change timely) and set filter-form value at the same time
  const { setValue, getValues, reset } = useFormContext<FilterQueryParams>();
  const formValue = getValues();
  const handleFilterChipsDelete = (chipToDelete: FilterChipData) => () => {
    setQueryParams((prev) => {
      let newData;
      if (Array.isArray(prev[chipToDelete.type])) {
        const prevData = [...(prev[chipToDelete.type] as string[])];
        newData = prevData?.filter((data) => data !== chipToDelete.key);
        return {
          ...prev,
          [chipToDelete.type]: newData,
        };
      } else {
        return {
          ...prev,
          [chipToDelete.type]: undefined,
        };
      }
    });
    const updateFilterOnChipDelete = (chipToDelete: FilterChipData) => {
      const filterFormValue = getValues();
      let newData;
      if (Array.isArray(filterFormValue[chipToDelete.type])) {
        const prevData = [...(filterFormValue[chipToDelete.type] as string[])];
        newData = prevData?.filter((data) => data !== chipToDelete.key);
        setValue(chipToDelete.type, newData);
      } else if (filterFormValue[chipToDelete.type] === 'open') {
        setValue('open', false);
      } else {
        setValue(chipToDelete.type, undefined);
      }
    };
    updateFilterOnChipDelete(chipToDelete);
  };

  //clear all filter
  const defaultValues = {
    meals: [],
    cuisine: [],
    type: [],
    duration: [],
    distance: 0,
    cost: 0,
    rating: '',
    open: false,
  };
  const clearAllFilter = () => {
    reset(defaultValues);
  };

  // two pages use same form context, reset form when the pages changes
  useEffect(() => {
    return () => {
      clearAllFilter();
    };
  }, []);

  //drawer open and close function
  const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);
  const handleFiltersToggle = () => {
    setOpenSideDrawer((prevState) => !prevState);
  };
  const handleCloseSideDrawer = () => {
    setOpenSideDrawer(false);
  };

  //view toggle function
  const [cardView, setCardView] = useState<boolean>(true);
  const handleViewToggle = () => {
    setCardView(!cardView);
  };

  //page number change function
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) =>
    setQueryParams((prev) => ({ ...prev, pageNumber: value }));

  //page results info
  const pageSize = DEFAULT_LISTING_PAGE_SIZE;
  const { pageCount, start, end } = paginationCalculation(pageSize, total, pageNumber);

  // map modal
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const toggleMapIsOpen = (state: boolean) => {
    setMapIsOpen(state);
  };

  return (
    <div>
      <SideDrawer
        open={openSideDrawer}
        onClose={handleCloseSideDrawer}
        type={type}
        setQueryParams={setQueryParams}
      />

      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          borderRadius: 1,
          height: 300,
          mt: 2,
          backgroundImage: `url(/assets/${
            type === MainType.Restaurant ? 'restaurant' : 'attraction'
          }-banner.png)`,
          backgroundSize: 'cover',
        }}
      >
        <Box
          aria-label={'mask'}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            opacity: '40%',
          }}
        ></Box>
        <Typography
          color={theme.palette.primary.main}
          fontSize="60px"
          fontWeight="600"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          zIndex={999}
        >
          {type === MainType.Restaurant ? 'Restaurant' : 'Attraction'}
        </Typography>
      </Box>
      <Grid
        xs={12}
        container
        justifyContent="space-between"
        flexDirection="row"
      >
        {/* desktop sidebar */}
        <Grid
          container
          sx={{ display: { xs: 'none', lg: 'block' }, pr: 3, mt: 2 }}
          md={3}
        >
          {/* sidebar map */}
          <Grid>
            <Box sx={{ height: 100, mb: 2 }}>
              <HeroMap
                mapIsOpen={mapIsOpen}
                toggleMapIsOpen={toggleMapIsOpen}
              />
              <MapWithSideBarModal
                mapIsOpen={mapIsOpen}
                toggleMapIsOpen={toggleMapIsOpen}
              />
            </Box>
          </Grid>
          {/* sidebar filter */}
          <Grid>
            <Card
              elevation={2}
              sx={{
                borderRadius: 1,
              }}
            >
              {!openSideDrawer && (
                <Filter
                  type={type}
                  setQueryParams={setQueryParams}
                />
              )}
            </Card>
          </Grid>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={9}
          container
          // justifyContent="flex-start"
          flexDirection="column"
        >
          <Grid
            container
            xs={12}
            sx={{ mt: 2, mb: 2 }}
            justifyContent="space-between"
            flexDirection="row"
          >
            {/* mobile map */}
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={0}
              sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center' }}
            >
              <Box sx={{ height: 100, width: '100%', mb: 1 }}>
                <HeroMap
                  mapIsOpen={mapIsOpen}
                  toggleMapIsOpen={toggleMapIsOpen}
                />
              </Box>
            </Grid>
            {/* mobile filter & sorting */}
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={0}
              sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'center' }}
            >
              <Box sx={{ width: '100%', mb: 1 }}>
                <FilterSortButton
                  handleFiltersToggle={handleFiltersToggle}
                  setQueryParams={setQueryParams}
                />
              </Box>
            </Grid>

            {/* clear selected filters */}
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={6}
              sx={{ display: 'flex', justifyContent: 'flex-start', heigh: 20 }}
            >
              <Box>
                {chipData.length !== 0 && (
                  <FilterMatchInfo
                    onClear={clearAllFilter}
                    matchResultsCount={total}
                  />
                )}
              </Box>
            </Grid>
            {/* desktop sorting & views */}
            <Grid
              xs={0}
              sm={0}
              md={0}
              lg={6}
              sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end', heigh: 20 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <SortSelect setQueryParams={setQueryParams} />
                <ViewToggleButton
                  handleViewToggle={handleViewToggle}
                  view={cardView}
                />
              </Box>
            </Grid>
            {/* selected filters */}
            <Grid xs={12}>
              <Box>
                <FilterChips
                  chipData={chipData}
                  handleFilterChipsDelete={handleFilterChipsDelete}
                />
              </Box>
            </Grid>
          </Grid>
          {/* Listing Cards */}
          <Grid
            container
            spacing={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {isLoading && (
              <Box sx={{ width: '100%' }}>
                <CircularProgress size={80} />
              </Box>
            )}
            {data &&
              data.length > 0 &&
              data.map((item: ListingInfoBasic, index: number) =>
                cardView ? (
                  <Grid
                    key={item ? item._id : index}
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <PlaceCard
                      _id={item._id}
                      imageUrl={item.photos[0]?.imageUrl}
                      name={item.name}
                      description={item.description}
                      overAllRating={item.overAllRating}
                      placeType={`${type}s`}
                    />
                  </Grid>
                ) : (
                  <Grid
                    key={item ? item._id : index}
                    xs={12}
                  >
                    <ListingList
                      listingInfo={item}
                      type={type}
                    />
                  </Grid>
                )
              )}
          </Grid>
          {/* Pagination */}
          {data.length > 0 && (
            <Grid
              xs={12}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 4 }}
            >
              <Pagination
                count={pageCount}
                page={pageNumber}
                color="primary"
                onChange={handlePageChange}
              />
              <Typography
                variant="body1"
                color="text.secondary"
                fontSize={12}
                sx={{ marginY: 2 }}
              >
                {`Showing  results ${start} - ${end} of ${total}`}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
