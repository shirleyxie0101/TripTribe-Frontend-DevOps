import { type ReactElement } from 'react';

import { Layout as DashboardLayout } from '@/layouts/Dashboard';
import Test from '@/sections/dashboard/test/test';

const Page = () => {
  return <Test />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
