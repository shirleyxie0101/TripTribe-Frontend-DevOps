import React from 'react';

import Copyright from '@/layouts/MainLayout/FooterLayout/copyright';
import FooterList from '@/layouts/MainLayout/FooterLayout/footer-list';
import { LogoButton } from '@/layouts/MainLayout/HeaderLayout/logo-button';
const Footer: React.FC = () => {
  return (
    <div className="w-full pt-12 pb-4 bg-[#F8F9FA] flex items-center md:justify-center sm:justify-start min-h-[380px]">
      <div className="max-w-[1200px] px-6">
        <div className="flex flex-col lg:flex-row mb-16 justify-center sm:gap-8 md:gap-16 lg:gap-40 xl-96">
          <LogoButton
            logoImageHeight={60}
            logoTextHeight={20}
          />
          <FooterList />
        </div>
        <div className="text-center">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default Footer;
