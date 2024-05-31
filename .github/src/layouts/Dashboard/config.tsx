import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { SvgIcon } from '@mui/material';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import File01Icon from '@/icons/untitled-ui/duocolor/file-01';
import HomeSmileIcon from '@/icons/untitled-ui/duocolor/home-smile';
import { paths } from '@/paths';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  return useMemo(() => {
    return [
      {
        items: [
          {
            title: 'Index',
            path: paths.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: 'Test',
            path: paths.blank,
            icon: (
              <SvgIcon fontSize="small">
                <File01Icon />
              </SvgIcon>
            ),
          },
          {
            title: 'Attraction',
            path: paths.attraction.index,
            icon: (
              <SvgIcon fontSize="small">
                <PhotoCameraOutlinedIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: 'List',
                path: paths.attraction.index,
              },
              {
                title: 'Detail',
                path: paths.attraction.detail,
              },
              {
                title: 'Edit',
                path: paths.attraction.edit,
              },
            ],
          },
          {
            title: 'Restaurant',
            path: paths.restaurant.index,
            icon: (
              <SvgIcon fontSize="small">
                <RestaurantMenuIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: 'List',
                path: paths.restaurant.index,
              },
              {
                title: 'Detail',
                path: paths.restaurant.detail,
              },
              {
                title: 'Edit',
                path: paths.restaurant.edit,
              },
            ],
          },
        ],
      },
    ];
  }, []);
};
