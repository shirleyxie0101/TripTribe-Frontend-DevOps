import { Box, Card, CardMedia, Grid, Link, Rating, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { FC } from 'react';

import { RouterLink } from '@/components/router-link';
import type { ListingInfoBasic, MainType } from '@/types/general';

import FavoriteToggle from './button/favorite-toggle';

type ListingInfoProps = {
  listingInfo: ListingInfoBasic;
  type: MainType;
};
const ListingList: FC<ListingInfoProps> = ({ listingInfo, type }) => {
  const { _id, photos, overAllRating, name, description } = listingInfo;
  const path = `/${type}s/${_id}`;

  return (
    <Card
      elevation={1}
      sx={{ height: 160, mb: 2, borderRadius: 4 }}
    >
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Grid
          item
          xs={4}
        >
          <Box sx={{ height: 160, width: '100%' }}>
            <CardMedia
              component={RouterLink}
              href={path}
              image={photos[0]?.imageUrl}
              sx={{ height: '100%', width: '100%' }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ display: 'flex', flexDirection: 'column', pY: 2, pX: 2 }}
        >
          <Grid
            item
            sx={{ width: '100%' }}
          >
            <Box sx={{ width: '100%' }}>
              <Link
                color="text.primary"
                component={RouterLink}
                href={path}
                underline="none"
                sx={{ height: 20 }}
              >
                <Typography
                  color="text.primary"
                  fontWeight={500}
                  sx={{
                    pY: 1,
                    pl: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {name}
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            sx={{ width: '100%' }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography
                color="text.secondary"
                sx={{
                  height: 100,
                  pY: 1,
                  pl: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '4',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {description}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ mt: -1 }}>
                {/* <FavoriteToggle
                  outlineColor={red[300]}
                  checkedColor={red[400]}
                /> */}
              </Box>
              <Rating
                name="read-only"
                value={overAllRating}
                readOnly
                sx={{ mr: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ListingList;
