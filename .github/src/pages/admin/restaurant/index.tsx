import React, { ReactElement } from 'react';

import { Layout as DashboardLayout } from '@/layouts/Dashboard';
import PlaceList from '@/sections/dashboard/place/list/place-list';

const Page = () => {
  return (
    <>
      <PlaceList placeType="restaurant" />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
