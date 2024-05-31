import { SvgIcon } from '@mui/material';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
        ],
      },
    ];
  }, [t]);
};
