import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import type { FC } from 'react';

import type { ColorPreset } from '@/theme';
import { blue, green, indigo, purple } from '@/theme/colors';

interface Option {
  label: string;
  value: ColorPreset;
  color: string;
}

interface OptionsColorPresetProps {
  onChange?: (value: ColorPreset) => void;
  value?: ColorPreset;
}

export const OptionsColorPreset: FC<OptionsColorPresetProps> = (props) => {
  const { onChange, value } = props;

  const options: Option[] = [
    {
      label: 'Green',
      value: 'green',
      color: green.main,
    },
    {
      label: 'Blue',
      value: 'blue',
      color: blue.main,
    },
    {
      label: 'Indigo',
      value: 'indigo',
      color: indigo.main,
    },
    {
      label: 'Purple',
      value: 'purple',
      color: purple.main,
    },
  ];

  return (
    <Stack spacing={1}>
      <Typography
        color="text.secondary"
        variant="overline"
      >
        Primary Color
      </Typography>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={2}
      >
        {options.map((option) => (
          <Chip
            icon={
              <Box
                sx={{
                  backgroundColor: option.color,
                  borderRadius: '50%',
                  flexShrink: 0,
                  height: 24,
                  width: 24,
                }}
              />
            }
            key={option.value}
            label={option.label}
            onClick={() => onChange?.(option.value)}
            sx={{
              borderColor: 'transparent',
              borderRadius: 1.5,
              borderStyle: 'solid',
              borderWidth: 2,
              ...(option.value === value && {
                borderColor: 'primary.main',
              }),
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

OptionsColorPreset.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOf(['blue', 'green', 'indigo', 'purple']),
};
