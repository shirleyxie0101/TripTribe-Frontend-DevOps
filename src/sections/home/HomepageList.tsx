import { ApolloError } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import PlaceCard from '@/components/PlaceCard';
import SkeletonCard from '@/components/SkeletonCard';
import { ListingInfoBasic } from '@/types/general';

type Props = {
  listTitle: string;
  listData: ListingInfoBasic[];
  error?: ApolloError;
};

const HomepageList: FC<Props> = ({ listTitle, listData, error = undefined }) => {
  if (error) {
    console.log(`Error: ${error.message}`);
    return;
  }
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ my: 4 }}
      >
        {listTitle}
      </Typography>
      <Grid
        container
        spacing={3}
      >
        {listData.map((item, index) => (
          <Grid
            key={item ? item._id : index}
            item
            xs={12}
            sm={6}
            md={3}
          >
            {item ? (
              <PlaceCard
                _id={item._id}
                imageUrl={item.photos[0]?.imageUrl}
                name={item.name}
                description={item.description}
                overAllRating={item.overAllRating}
                placeType={listTitle.toLowerCase()}
              />
            ) : (
              <SkeletonCard />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomepageList;
