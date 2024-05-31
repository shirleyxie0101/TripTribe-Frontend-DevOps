import { type ReactElement } from 'react';

import { Layout as DashboardLayout } from '@/layouts/Dashboard';
import Index from '@/sections/dashboard';

const Page = () => {
  return <Index />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
