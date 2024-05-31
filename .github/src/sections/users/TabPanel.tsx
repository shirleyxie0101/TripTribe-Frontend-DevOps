import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/router';
import React from 'react';

import { UserTab } from '@/constants/userProfilePage';
import { FavoritesCard } from '@/sections/users/FavoritesCard';
import { GeneralCard } from '@/sections/users/GeneralCard';
import { ReviewsCard } from '@/sections/users/ReviewsCard';
import { SecurityCard } from '@/sections/users/SecurityCard';
import { User } from '@/types/user';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TabProps = {
  user: User;
  isMe: boolean;
  userId: string | string[] | undefined;
  currentTab: UserTab;
};

const TabPanel: React.FC<TabProps> = ({ user, isMe, userId, currentTab }) => {
  let tabs = [
    {
      label: UserTab.General,
      component: GeneralCard,
      privacyTab: false,
    },
    {
      label: UserTab.Favorites,
      component: FavoritesCard,
      privacyTab: false,
    },
    {
      label: UserTab.Reviews,
      component: ReviewsCard,
      privacyTab: false,
    },
    {
      label: UserTab.Security,
      component: SecurityCard,
      privacyTab: true,
    },
  ];
  const router = useRouter();
  const currentTabIndex = tabs.findIndex((tab) => tab.label === currentTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const targetPath = `/users/${userId}/${tabs[newValue].label}`;
    router.push(targetPath);
  };

  if (!isMe) {
    tabs = tabs.filter((tab) => !tab.privacyTab);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs &&
            tabs.map((tab, index) => {
              return (
                <Tab
                  label={tab.label}
                  key={index}
                  {...a11yProps(index)}
                />
              );
            })}
        </Tabs>
      </Box>
      {tabs &&
        tabs.map((tab, index) => {
          return (
            <CustomTabPanel
              value={currentTabIndex}
              key={index}
              index={index}
            >
              <tab.component
                isMe={isMe}
                user={user}
                userId={userId}
              />
            </CustomTabPanel>
          );
        })}
    </Box>
  );
};

export default TabPanel;
