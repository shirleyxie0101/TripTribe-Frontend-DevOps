import Error from '@/components/Error';

const UnauthorizedPage = () => {
  return (
    <Error
      errorMessage={''}
      errorStatus={403}
    />
  );
};

export default UnauthorizedPage;
