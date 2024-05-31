import { Box } from '@mui/system';
import React from 'react';

type PinProps = {
  size?: number;
  placeColor?: string;
  placeType?: string;
  placeIcon?: React.JSX.Element;
  id: string;
};

export const Pin: React.FC<PinProps> = ({ size = 40, placeColor, placeIcon, id }) => {
  return (
    <Box
      aria-label="Map Pin"
      display={'flex'}
      position={'relative'}
      width={40}
      id={id}
    >
      <Box>
        <svg
          width={size}
          height={(size * 5) / 4}
          viewBox="0 0 68 83"
          fill={placeColor}
          cursor={'pointer'}
          stroke="none"
        >
          <path d="M67 34C67 59.6667 34 81.6667 34 81.6667C34 81.6667 1 59.6667 1 34C1 25.2479 4.47678 16.8542 10.6655 10.6655C16.8542 4.47678 25.2479 1 34 1C42.7521 1 51.1458 4.47678 57.3345 10.6655C63.5232 16.8542 67 25.2479 67 34Z" />
        </svg>
      </Box>
      <Box
        color={'white'}
        position={'absolute'}
        left={8}
        top={9}
        sx={{ cursor: 'pointer' }}
      >
        {placeIcon}
      </Box>
    </Box>
  );
};

export default React.memo(Pin);
