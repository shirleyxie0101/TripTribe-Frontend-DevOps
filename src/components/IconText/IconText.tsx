import { Box, SvgIconProps, Typography } from '@mui/material';
import React from 'react';

// Define the prop types for the component
type IconTextProps = {
  icon: React.ReactElement<SvgIconProps>;
  text: string;
};

const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      {icon}
      <Typography
        sx={{ ml: 1 }}
        variant="body2"
      >
        {text}
      </Typography>
    </Box>
  );
};

export default IconText;
