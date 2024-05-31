import { Box, Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { FilterQueryParams } from '@/types/general';

interface MultiCheckboxProps {
  name: string;
  control: any;
  label: string;
  multiCheckboxOptions: string[];
}

export const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  name,
  control,
  label,
  multiCheckboxOptions,
}) => {
  const { getValues } = useFormContext<FilterQueryParams>();
  const handleSelect = (value: string) => {
    const selectedItems = getValues(name as keyof FilterQueryParams) as string[];
    if (selectedItems === undefined) {
      return [value];
    }
    if (Array.isArray(selectedItems)) {
      const isPresent = selectedItems.indexOf(value);
      if (isPresent !== -1) {
        const remaining = selectedItems.filter((item: any) => item !== value);
        return remaining;
      } else {
        return [...selectedItems, value];
      }
    }
  };

  return (
    <FormControl>
      <FormLabel
        sx={{
          display: 'block',
          mb: 2,
        }}
      >
        {label}
      </FormLabel>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderColor: 'divider',
          borderRadius: 1,
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        {multiCheckboxOptions?.map((option: any) => {
          return (
            <FormControlLabel
              sx={{
                py: 1,
                px: 1.5,
              }}
              control={
                <Controller
                  name={name}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      checked={!!value?.includes(option)}
                      onChange={() => onChange(handleSelect(option))}
                    />
                  )}
                  control={control}
                />
              }
              label={option}
              key={option}
            />
          );
        })}
      </Box>
    </FormControl>
  );
};
