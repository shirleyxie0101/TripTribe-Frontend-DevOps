import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Fade, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import tz_lookup from 'tz-lookup';

import { PlaceProps } from '@/types/attractions-restaurants';
import { getCurrentWeekday } from '@/utils/get-current-date-time';

type PlaceLocationProps = {
  placeData: PlaceProps;
};

export const PlaceLocation: React.FC<PlaceLocationProps> = ({ placeData }) => {
  const { ref, inView, entry } = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);
  const timeZone = tz_lookup(placeData.address.location.lat, placeData.address.location.lng);
  const weekday = getCurrentWeekday(timeZone);
  const locationDetailList = [
    {
      key: placeData.address.formattedAddress,
      icon: (
        <LocationOnOutlinedIcon
          key="location"
          fontSize="small"
        />
      ),
    },
    {
      key: placeData.email,
      icon: (
        <EmailOutlinedIcon
          key="email"
          fontSize="small"
        />
      ),
    },
    {
      key: placeData.website,
      icon: (
        <ComputerOutlinedIcon
          key="computer"
          fontSize="small"
        />
      ),
    },
    {
      key: `Open Hour from ${placeData.openHours[weekday].period[0].openTime} to ${placeData.openHours[weekday].period[0].closeTime}`,
      icon: (
        <AccessTimeOutlinedIcon
          key="time"
          fontSize="small"
        />
      ),
    },
  ];

  return (
    <Fade
      in={show}
      timeout={1100}
    >
      <List
        ref={ref}
        disablePadding
      >
        <ListItem sx={{ p: 0, pl: 1, mt: 0 }}>
          <Typography
            variant="h5"
            fontWeight={600}
          >
            Location and Contact
          </Typography>
        </ListItem>
        {locationDetailList.map((item, index) => {
          return (
            <ListItem
              key={item.key}
              sx={{ p: 0, pl: 1, mt: 1 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                sx={{ ml: -1 }}
                primary={item.key}
                primaryTypographyProps={{}}
              />
            </ListItem>
          );
        })}
      </List>
    </Fade>
  );
};
