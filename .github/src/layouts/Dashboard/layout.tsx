import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { type FC, type ReactNode, useContext, useEffect } from 'react';

import { UserContext } from '@/contexts/user-context/user-context';
import { useSettings } from '@/hooks/use-settings';
import { UserRole } from '@/types/user';

import { useSections } from './config';
import { MainLayout } from './main-layout';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const settings = useSettings();
  const sections = useSections();

  const { userData } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (userData?.role !== UserRole.Admin) {
      // router.push('/unauthorized');
    }
  }, [userData, UserRole]);

  return (
    <MainLayout
      sections={sections}
      navColor={settings.navColor}
      {...props}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
