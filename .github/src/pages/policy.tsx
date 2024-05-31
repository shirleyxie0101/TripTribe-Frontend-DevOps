import { Box } from '@mui/material';
import React from 'react';

import Policy from '@/components/Policy';
import Layout from '@/layouts/MainLayout';

export default function policy() {
  return (
    <Layout>
      <Box
        sx={{
          padding: '100px 0',
          margin: '0 auto',
          maxWidth: '780px',
        }}
      >
        <Policy />
      </Box>
    </Layout>
  );
}
