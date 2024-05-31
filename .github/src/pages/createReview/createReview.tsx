import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { CircularLoading } from '@/components/CircularLoading';
import { UserContext } from '@/contexts/user-context/user-context';
import Layout from '@/layouts/MainLayout';

import PlaceCard from './components/PlaceCard';
import ReviewForm from './components/ReviewForm';

type Image = {
  src: string;
  alt: string;
};

type Photo = {
  imageAlt: string;
  imageUrl: string;
};

type PlaceInfo = {
  name: string;
  image: Image;
  address: {
    formattedAddress: string;
  };
  photos?: Photo[];
};

type FetcherFunction = (url: string) => Promise<any>;

const fetcher: FetcherFunction = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

type CreateReviewProps = {};

const CreateReview: React.FC<CreateReviewProps> = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const { isAuthenticated } = useContext(UserContext);

  const { placeId, placeType } = router.query as { placeId: string; placeType: string };

  const basicUrl: string = process.env.NEXT_PUBLIC_REST_API_URL || '';

  const [formIsDirty, setFormIsDirty] = useState(false);

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (formIsDirty) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [formIsDirty]);

  const handleFormDirtyChange = (isDirty: boolean) => {
    setFormIsDirty(isDirty);
  };

  // Fetch placeInfo data using useSWR
  const {
    data: placeInfo,
    error,
    isValidating,
  } = useSWR<PlaceInfo>(
    placeType && placeId ? `${basicUrl}/${placeType}s/${placeId}` : null,
    fetcher
  );

  if (!router.isReady) return <CircularLoading size={80} />;
  // Determine loading status based on placeInfo, error, and isValidating
  const isLoading: boolean = (!placeInfo && !error) || isValidating;

  // Create a simplified placeInfo object
  const newPlaceInfo: PlaceInfo = {
    name: placeInfo?.name || '',
    image: {
      src: placeInfo?.photos?.[0]?.imageUrl || '',
      alt: placeInfo?.photos?.[0]?.imageAlt || '',
    },
    address: {
      formattedAddress: placeInfo?.address?.formattedAddress || '',
    },
  };

  const navigateToPlaceDetail = () => {
    router.push(`${placeType.toLowerCase()}s/${placeId}`);
  };

  return (
    <Layout>
      {isAuthenticated ? (
        <Container
          maxWidth="lg"
          sx={{ my: { xs: 6, md: 12 } }}
        >
          <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            alignContent="center"
          >
            <Grid
              item
              sm={12}
              md={4}
              sx={{
                position: isMediumScreen ? 'sticky' : 'fix',
                top: isMediumScreen ? 96 : 'initial',
              }}
            >
              {!isLoading && newPlaceInfo.name ? (
                <PlaceCard
                  isMediumScreen={isMediumScreen}
                  placeInfo={newPlaceInfo}
                  onNavigateBack={navigateToPlaceDetail}
                />
              ) : (
                <Box
                  sx={{
                    border: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  {/* Display a loading indicator or an error message */}
                  {isLoading ? (
                    <CircularProgress size={40} />
                  ) : (
                    <>
                      <ErrorOutlineIcon fontSize="large" />
                      <Typography
                        variant="h5"
                        mt={2}
                      >
                        Sorry! No result found
                      </Typography>
                      <Typography
                        color="error"
                        mt={2}
                      >
                        Please try again...
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Grid>
            <Grid
              item
              sm={12}
              md={8}
              sx={{ borderLeft: isMediumScreen ? '1px solid gray' : 'none' }}
            >
              <ReviewForm
                placeId={placeId}
                placeType={placeType}
                onFormDirtyChange={handleFormDirtyChange}
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Typography
            variant="h4"
            color="text.primary"
          >
            Please
            <Link
              href="/signin"
              color="primary"
            >
              login
            </Link>
            to access this page.
          </Typography>
        </Box>
      )}
    </Layout>
  );
};

export default CreateReview;
