import React, { ReactElement } from 'react';

import { Layout as DashboardLayout } from '@/layouts/Dashboard';

const Page = () => {
  return <div>admin restaurant detail</div>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
