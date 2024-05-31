import { Grid, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { FC } from 'react';

interface Props {
  isCardView?: boolean;
}
const SkeletonCard: FC<Props> = ({ isCardView = true }) => {
  return isCardView ? (
    <Box sx={{ mb: 1.5 }}>
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{ borderRadius: 2 }}
      />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="30%" />
        <Skeleton />
        <Skeleton />
      </Box>
    </Box>
  ) : (
    <Box sx={{ borderRadius: 4, height: 200, mb: 2 }}>
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Grid xs={4}>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid xs={8}>
          <Box sx={{ ml: 2, mt: 2 }}>
            <Skeleton width="30%" />
            <Skeleton width="50%" />
            <Skeleton
              variant="rectangular"
              height={130}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SkeletonCard;
