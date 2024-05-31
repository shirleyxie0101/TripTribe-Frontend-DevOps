import { Box, Typography } from '@mui/material';

const Copyright: React.FC = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        color="inherit"
      >
        &copy; {new Date().getFullYear()} ExploreXperts All rights reserved.
      </Typography>
    </Box>
  );
};
export default Copyright;
