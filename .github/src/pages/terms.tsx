import { Box } from '@mui/material';
import React from 'react';

import Terms from '@/components/Terms';
import Layout from '@/layouts/MainLayout';

export default function terms() {
  return (
    <Layout>
      <Box
        sx={{
          padding: '100px 0',
          margin: '0 auto',
          maxWidth: '780px',
        }}
      >
        <Terms />
      </Box>
    </Layout>
  );
}
