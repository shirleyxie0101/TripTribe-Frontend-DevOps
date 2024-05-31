import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { CircularLoading } from '@/components/CircularLoading';
import Error from '@/components/Error';
import { UserTab } from '@/constants/userProfilePage';
import { useUserContext } from '@/contexts/user-context/user-context';
import Layout from '@/layouts/MainLayout';
import TabPanel from '@/sections/users/TabPanel';
import { User } from '@/types/user';
import axiosInstance from '@/utils/request';

const UserDetailPage = () => {
  const router = useRouter();

  const { userId, tab } = router.query;
  const { isAuthenticated, userData = null } = useUserContext();

  const isMe = userId === 'me';

  // when user log in, if url is /users/{userself's id}
  const isMyIDAndLogin = !isMe && userId && isAuthenticated && userId === userData?._id;
  if (isMyIDAndLogin) {
    router.replace('/users/me/general');
  }

  const userUrl = isMe ? '/users/me' : `/users/${userId}`;

  const requestOptions =
    userId === undefined
      ? {}
      : {
          url: userUrl,
          method: 'get',
        };

  const { data, error, isLoading } = useSWR<User>(requestOptions, async () => {
    const response = await axiosInstance.request<User>(requestOptions);
    return response.data;
  });

  if (isLoading) {
    return <CircularLoading size={80} />;
  }

  if (error) {
    return (
      <Error
        errorMessage={error.message}
        errorStatus={error.response?.status}
      />
    );
  }

  /**
   * Return <Error> component when user in their own profile but authentication if false
   *
   * it happens when refresh token expired, a user-profile component call protected api
   * and get 401 unauthorized error
   */
  if (isMe && !isAuthenticated) {
    return (
      <Error
        errorMessage={''}
        errorStatus={401}
      />
    );
  }

  if (!data) {
    return;
  }

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          my: 5,
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
          }}
        >
          <Typography variant="h5">User Profile</Typography>
        </Box>
        {data && (
          <TabPanel
            user={data as User}
            isMe={isMe}
            userId={userId}
            currentTab={tab as UserTab}
          />
        )}
      </Container>
    </Layout>
  );
};

export default UserDetailPage;
