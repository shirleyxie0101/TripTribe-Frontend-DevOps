import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { LogoImage } from '@/icons/logo-image';
import Layout from '@/layouts/MainLayout';
import theme from '@/styles/theme';

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
        {/* contact-us-content */}
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', mb: 4 }}>
            <Typography
              color={theme.palette.primary.dark}
              fontSize={'40px'}
            >
              W
            </Typography>
            <Typography
              color={'text.primary'}
              fontSize={'26px'}
            >
              elcome to TripTribe, where every adventure begins with a delicious discovery!
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 4 }}>
            <Typography
              color={theme.palette.primary.light}
              fontSize={'20px'}
            >
              We believe that the journey is just as important as the destination...
            </Typography>
          </Box>
          <Grid container>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Box sx={{ mr: 4 }}>
                <LogoImage />
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{ mt: 10 }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={1}
                    >
                      <Box>
                        <HomeIcon />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                    >
                      <Box>
                        <Typography>17 Chapman Avenue </Typography>
                        <Typography>Woodford, New South Wales 2778</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ mt: 4 }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={1}
                    >
                      <Box>
                        <LocalPhoneIcon />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                    >
                      <Box>
                        <Typography>(02) 1234 1234</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ mt: 4 }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={1}
                    >
                      <Box>
                        <EmailIcon />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                    >
                      <Box>admin@triptribe.com</Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ mt: 4 }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={1}
                    >
                      <Box>
                        <PeopleIcon />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={10}
                    >
                      <Box>
                        <Typography>
                          We are your trusted companion for creating memories that will last a
                          lifetime.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
