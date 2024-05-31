import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { SxProps } from '@mui/system';
import NextLink from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';

import { pinIconColor, pinIconList } from '@/components/map/components/pinIconProps';
import { useDebounce } from '@/hooks/use-debounce';
import { PlaceProps } from '@/types/attractions-restaurants';
import { PlacesData } from '@/types/map';
import { SearchDataType } from '@/types/search-result';
import axiosInstance from '@/utils/request';

const DEBOUNCE_INTERVAL = 500;

type SearchBarProps = {
  sx?: SxProps;
  id?: string;
  text?: string;
  className?: string;
};

// top search bar for searching restaurants or attractions
export const NaviTopSearchBar: FC<SearchBarProps> = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<PlaceProps[]>([]);
  const [fetchedData, setFetchedData] = useState<SearchDataType<PlaceProps>>({
    Attraction: [],
    Restaurant: [],
  });
  const [loading, setLoading] = useState(false);
  const { text, ...otherProps } = props;
  const fakeFetch = async (input: string) => {
    setLoading(true);
    axiosInstance
      .request<PlacesData>({
        url: '/search/globalSearch',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          keyword: input,
          limit: 20,
        },
      })
      .then((res) => {
        let data: SearchDataType<PlaceProps> = { Attraction: [], Restaurant: [] };
        res.data.forEach((item) => {
          if (item.type === 'Attraction') {
            data.Attraction.push(item);
          } else {
            data.Restaurant.push(item);
          }
        });
        setFetchedData(data);
      })
      .catch((err) => {
        console.error('fetch data error', err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setOptions(() => [...fetchedData.Attraction, ...fetchedData.Restaurant]);
  }, [fetchedData]);
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const fetchDataDebounce = useDebounce(fakeFetch, DEBOUNCE_INTERVAL);

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const newValue: string = event.target.value;
    // after getting the new value
    setInputValue(newValue);
    fetchDataDebounce(newValue); // Pass the new value to fetchDataDebounce
  };

  return (
    <Box {...otherProps}>
      <Autocomplete
        fullWidth
        size="small"
        forcePopupIcon={false}
        disableClearable
        noOptionsText={inputValue ? 'No Result' : 'Search'}
        // render the dropdown element in hierarchy
        disablePortal={true}
        // fetch the result
        // options will be load after fetched data
        options={inputValue ? options : []}
        // render the inputValue to the display window
        inputValue={inputValue}
        // set the async loading for autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
          setOptions([]);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        // use to override the  equalization method from OPTIONS to INPUT VALUE
        // here, the option.type leads to the input value should be place or restaurant
        getOptionLabel={(option) => option.name}
        loading={loading}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={text}
              onChange={handleTextInput}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
              }}
              // input base
              InputProps={{
                ...params.InputProps,

                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ marginLeft: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Fragment>
                    {loading ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          );
        }}
        renderOption={(props, option) => {
          return (
            <li
              key={option._id}
              {...props}
            >
              <Link
                component={NextLink}
                href={`/${option.type.toLowerCase()}s/${option._id}`}
                underline="none"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                width={1}
                f-width
              >
                <Box
                  marginRight="5px"
                  sx={{ height: '40px', width: '40px', display: 'flex', alignItems: 'center' }}
                  color={pinIconColor[option.type]}
                >
                  {pinIconList[option.type]}
                </Box>
                <Box>
                  <Typography>{option.name}</Typography>
                  <Typography>{option.address.formattedAddress}</Typography>
                </Box>
              </Link>
            </li>
          );
        }}
      />
    </Box>
  );
};
