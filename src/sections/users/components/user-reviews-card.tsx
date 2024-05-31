import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import InnerHTML from 'dangerously-set-html-content';
import dayjs from 'dayjs';
import { FC, useMemo, useState } from 'react';

import { RouterLink } from '@/components/router-link';
import Gallery from '@/sections/place-detail-page/components/place-reviews/components/gallery';
import { PlaceProps } from '@/types/attractions-restaurants';
import { MainType } from '@/types/general';
import { Creator, UserReview } from '@/types/review';

type UserReviewCardProps = {
  creator: Creator;
  review: UserReview;
  onDelete: () => Promise<void>;
  onEdit: () => void;
  isAuthenticated: boolean;
  isAuthorized: boolean;
};

const DEFAULT_USER_NAME = 'User';

const UserReviewCard: FC<UserReviewCardProps> = ({
  creator,
  review,
  onDelete,
  onEdit,
  isAuthenticated,
  isAuthorized,
}) => {
  const { nickname = DEFAULT_USER_NAME, userAvatar } = creator;
  const {
    photos: reviewPhotos = [],
    rating: reviewRating = 0,
    title: reviewTitle = ' ',
    description: reviewDescription,
    placeId: placeData = {} as PlaceProps,
    updatedAt: reviewUpdatedAt,
  } = review;

  const {
    name: placeName = ' ',
    overAllRating: placeOverallRating = 0,
    photos: placePhoto = [],
    description: placeDescription = ' ',
  } = placeData;

  const reviewDate =
    reviewUpdatedAt && dayjs(reviewUpdatedAt).isValid()
      ? dayjs(reviewUpdatedAt).format('DD/MM/YYYY')
      : ' ';
  const placeType = review.placeType === 'Attraction' ? MainType.Attraction : MainType.Restaurant;
  const placeDetailPagePath = `/${placeType}s/${placeData._id}`;

  // confirm-delete dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleConfirm = async () => {
    await onDelete();
    setOpenDialog(false);
  };

  // user avatar scr
  const avatarUrl = userAvatar?.imageUrl ? userAvatar.imageUrl : undefined;
  const avatarLetter = nickname ? nickname[0].toUpperCase() : 'U';

  return (
    <Box sx={{ mb: 6 }}>
      <Grid container>
        <Grid
          container
          sx={{ p: 1 }}
        >
          <Grid
            item
            md={1}
            xs={2}
          >
            <Box
              sx={{
                maxHeight: '60px',
                maxWidth: '60px',
                minHeight: '40px',
                minWidth: '40px',
                pt: 0.5,
              }}
            >
              <Avatar
                alt="User Avatar"
                src={avatarUrl}
                sx={{ height: '100%', width: '100%' }}
              >
                {avatarUrl === undefined && avatarLetter}
              </Avatar>
            </Box>
          </Grid>
          <Grid
            item
            md={9}
            xs={10}
            sx={{ pl: 1 }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <Box>
                <Typography
                  color="text.Primary"
                  fontWeight={600}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {nickname}
                </Typography>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography color="text.secondary">{reviewDate}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Box>
                <Rating
                  name="read-only"
                  value={reviewRating}
                  size="small"
                  readOnly
                  sx={{ mt: 1 }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Box>
                <Typography
                  color="text.primary"
                  fontWeight={600}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {reviewTitle}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Box>
                <Typography
                  component="div"
                  color="text.primary"
                >
                  {reviewDescription ? <InnerHTML html={reviewDescription} /> : ' '}
                </Typography>
              </Box>
            </Grid>

            {reviewPhotos.length > 0 && (
              <Grid
                item
                xs={12}
              >
                <Box sx={{ mt: 1 }}>
                  <Gallery
                    galleryID="user-review-gallery"
                    images={reviewPhotos}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
          {isAuthorized && isAuthenticated && (
            <Grid
              item
              md={2}
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <Grid
                item
                xs={6}
                sx={{ width: '100%' }}
              >
                <Box sx={{ width: '100%' }}>
                  <Button
                    size="small"
                    onClick={onEdit}
                    fullWidth
                  >
                    <EditIcon />
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ width: '100%' }}
              >
                <Box sx={{ width: '100%' }}>
                  <Button
                    size="small"
                    onClick={handleClickOpen}
                    fullWidth
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </Box>
                <Box>
                  <Dialog
                    open={openDialog}
                    onClose={handleClose}
                  >
                    <DialogTitle>Confirm to delete this review?</DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={handleConfirm}
                        autoFocus
                      >
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
        {placeData && (
          <Grid
            item
            xs={12}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#F8F9FA',
                borderRadius: 1,
                p: 1,
              }}
            >
              <CardActionArea
                component={RouterLink}
                href={placeDetailPagePath}
              >
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    md={1}
                    sx={{ height: '100%', width: '100%' }}
                  >
                    {placePhoto.length > 0 && placePhoto[0].imageUrl && (
                      <Box sx={{ height: '100%', width: '100%', pt: 0.5 }}>
                        <CardMedia
                          component="img"
                          sx={{ height: '60px' }}
                          image={placePhoto[0].imageUrl}
                        />
                      </Box>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    md={11}
                    sx={{ pl: 1 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{ display: 'flex' }}
                    >
                      <Box sx={{ mr: 2 }}>
                        <Typography
                          color="text.Primary"
                          fontSize="14px"
                        >
                          {placeName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          color="text.Primary"
                          fontSize="14px"
                        >
                          {placeOverallRating} / 5
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    ></Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <Typography
                        fontSize="14px"
                        color={'text.secondary'}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {placeDescription}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Box>
          </Grid>
        )}
      </Grid>
      <Divider
        light
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default UserReviewCard;
