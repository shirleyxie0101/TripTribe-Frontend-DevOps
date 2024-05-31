import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import {
  Box,
  Button,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import IconText from '@/components/IconText';
import LikeIconButton from '@/components/LikeIconButton';
import { PlaceProps } from '@/types/attractions-restaurants';
import { MainType } from '@/types/general';

type PlaceDetailsProps = {
  placeData: PlaceProps;
  placeType: string;
  ratingTotalCount: number;
  id: string;
  writeReview: () => void;
};

const PlaceDetails: React.FC<PlaceDetailsProps> = ({
  writeReview,
  placeData,
  ratingTotalCount,
  id,
  placeType,
}) => {
  const { ref, inView, entry } = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);
  const type = placeType === 'restaurants' ? MainType.Restaurant : MainType.Attraction;
  const detailIconList: { [key: string]: React.JSX.Element } = {
    phone: <PhoneCallbackOutlinedIcon fontSize="small" />,
    email: <EmailOutlinedIcon fontSize="small" />,
    website: <ComputerOutlinedIcon fontSize="small" />,
  };

  return (
    <Fade
      in={show}
      timeout={1100}
    >
      <Box
        width={1}
        ref={ref}
      >
        <Grid container>
          <Grid
            item
            xs={8}
          >
            <Typography
              fontSize={30}
              component="h2"
              sx={{ fontWeight: 'bold' }}
            >
              {placeData.name.toUpperCase()}
            </Typography>
            <Typography
              fontSize={16}
              component="h3"
              noWrap
            >
              {placeData.description}
            </Typography>
            <Link href={'#place-description'}>More</Link>
            <Typography
              sx={{
                marginTop: '8px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '8px',
              }}
              variant="body2"
              gutterBottom
            >
              <Rating
                name="read-only"
                value={placeData.overAllRating}
                readOnly
                size="small"
                sx={{ mr: 1 }}
              />
              {ratingTotalCount === 0 ? (
                <>No Review</>
              ) : (
                <Link
                  component={NextLink}
                  href={'#place-review'}
                >{`${ratingTotalCount} reviews`}</Link>
              )}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                height: 45,
              }}
            >
              <LikeIconButton
                placeType={type}
                id={id}
                withText={true}
              />
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1 }}
              />
              <Button
                sx={{ color: 'black' }}
                onClick={writeReview}
              >
                <IconText
                  icon={<CreateOutlinedIcon fontSize="small" />}
                  text="Write"
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <List
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexWrap: 'wrap',
            }}
          >
            {['phone', 'email', 'website'].map((text, index) => {
              return (
                <ListItem
                  key={text}
                  sx={{ p: 0, width: 'auto' }}
                >
                  <ListItemIcon sx={{ color: 'black', justifyContent: 'center', ml: -1 }}>
                    {detailIconList[text]}
                  </ListItemIcon>

                  <Box
                    // ml={-1}
                    mr={1}
                  >
                    {text === 'website' ? (
                      <Button href={placeData.website}>Website</Button>
                    ) : (
                      <ListItemText
                        primary={placeData[text] as string}
                        primaryTypographyProps={{ fontSize: 16 }}
                      />
                    )}
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Fade>
  );
};

export default PlaceDetails;
