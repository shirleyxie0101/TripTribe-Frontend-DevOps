import { Box, Button, Stack, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  attractionType,
  costSliderRange,
  cuisineType,
  distanceMarksAtt,
  distanceMarksRes,
  distanceSliderRangeAtt,
  distanceSliderRangeRes,
  dollarMarks,
  durationType,
  mealType,
  rating,
} from '@/constants/filter';
import { useDebounce } from '@/hooks/use-debounce';
import {
  FilterQueryParams,
  FilterQueryParamsSchema,
  MainType,
  QueryParamsType,
} from '@/types/general';

import { MultiCheckbox } from './form-components/multi-checkbox';
import { FormRadio } from './form-components/radio';
import { FormSlider } from './form-components/slider';
import { FormSwitch } from './form-components/switch';

interface FilterProps {
  type: MainType;
  closeDrawer?: () => void;
  inDrawer?: boolean;
  setQueryParams: Dispatch<SetStateAction<QueryParamsType>>;
}

const Filter: FC<FilterProps> = ({ type, closeDrawer, inDrawer = false, setQueryParams }) => {
  const { handleSubmit, control } = useFormContext<FilterQueryParams>();
  const formAllValues = useWatch({ control });

  //
  //submit function: setQueryParams
  const onSubmit = (data: FilterQueryParams) => {
    const parsedFilterData = FilterQueryParamsSchema.parse(data);
    setQueryParams((prev) => ({ ...prev, ...parsedFilterData }));
  };

  const onSubmitDebounce = useDebounce((data) => onSubmit(data), 300);

  //Not in drawer: call submit function with debounce
  useEffect(() => {
    if (inDrawer) {
      return;
    }
    handleSubmit(onSubmitDebounce)();
  }, [JSON.stringify(formAllValues)]);

  //In drawer: call submit function when click 'Apply' button
  const handleClick = () => {
    handleSubmit(onSubmit)();
    if (inDrawer && closeDrawer !== undefined) {
      closeDrawer();
    }
  };

  return (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        sx={{ p: 3 }}
      >
        <Typography variant="h5">Filters</Typography>
      </Stack>

      <Stack
        spacing={5}
        sx={{ p: 3 }}
      >
        {type === MainType.Restaurant && (
          <Stack spacing={5}>
            <MultiCheckbox
              control={control}
              name={'meals'}
              label={'Meals'}
              multiCheckboxOptions={mealType}
            />
            <MultiCheckbox
              control={control}
              name={'cuisine'}
              label={'Cuisine'}
              multiCheckboxOptions={cuisineType}
            />
          </Stack>
        )}
        {type === MainType.Attraction && (
          <Stack spacing={5}>
            <MultiCheckbox
              control={control}
              name={'type'}
              label={'Type'}
              multiCheckboxOptions={attractionType}
            />
            <MultiCheckbox
              control={control}
              name={'duration'}
              label={'Duration'}
              multiCheckboxOptions={durationType}
            />
          </Stack>
        )}

        <div>
          <Stack spacing={4}>
            {type === MainType.Restaurant && (
              <Box>
                <FormSlider
                  name={'distance'}
                  label={'Distance'}
                  control={control}
                  sliderMark={distanceMarksRes}
                  sliderRange={distanceSliderRangeRes}
                />
              </Box>
            )}

            {type === MainType.Attraction && (
              <Box>
                <FormSlider
                  name={'distance'}
                  label={'Distance'}
                  control={control}
                  sliderMark={distanceMarksAtt}
                  sliderRange={distanceSliderRangeAtt}
                />
              </Box>
            )}
            <Box>
              <FormSlider
                name={'cost'}
                label={'Cost'}
                control={control}
                sliderMark={dollarMarks}
                sliderRange={costSliderRange}
              />
            </Box>
            <Box>
              <FormRadio
                name={'rating'}
                label={'Rating'}
                control={control}
                radioOptions={rating}
              />
            </Box>
          </Stack>
        </div>
        <FormSwitch
          name={'open'}
          control={control}
          label={'Open Now'}
        />
        {inDrawer && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              variant="contained"
              onClick={handleClick}
            >
              Apply
            </Button>
          </Box>
        )}
      </Stack>
    </div>
  );
};

export default Filter;
