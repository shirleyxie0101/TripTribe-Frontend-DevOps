import { type ReactElement } from 'react';

import Layout from '@/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import DetailPageLayout from '@/sections/place-detail-page/components/place-detail-page-layout';
import { PlaceContent } from '@/sections/place-detail-page/place-content';

// page content
const Page: NextPageWithLayout = () => {
  return <PlaceContent />;
};

// global layout with individual layout
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DetailPageLayout>{page}</DetailPageLayout>
    </Layout>
  );
};

export default Page;
