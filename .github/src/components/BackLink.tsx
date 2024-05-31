import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';

function BackLink() {
  const router = useRouter();

  const goBack = () => {
    router.back(); // This will navigate back to the previous page
  };

  return (
    <Link
      component="button" // Make the Link look like a button
      onClick={goBack} // Call the goBack function when the Link is clicked
      color="inherit"
      underline="none"
      variant="subtitle2"
    >
      <Box
        display="flex"
        alignItems="center"
        padding="10px"
      >
        <ArrowBackIcon />
        <Typography
          variant="subtitle1"
          sx={{ ml: 1 }}
        >
          Back
        </Typography>
      </Box>
    </Link>
  );
}

export default BackLink;
