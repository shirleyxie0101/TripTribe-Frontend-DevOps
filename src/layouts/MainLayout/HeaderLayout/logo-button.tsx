import Box from '@mui/material/Box';
import NextLink from 'next/link';

import { LogoImage } from '@/icons/logo-image';
import { LogoText } from '@/icons/logo-text';
type LogoButtonProps = {
  logoImageWidth?: number;
  logoImageHeight?: number;
  logoTextWidth?: number;
  logoTextHeight?: number;
};

export const LogoButton: React.FC<LogoButtonProps> = ({
  logoImageWidth = 'auto',
  logoImageHeight = 'auto',
  logoTextWidth = 'auto',
  logoTextHeight = 'auto',
}) => {
  return (
    <Box
      component={NextLink}
      href={'/'}
      sx={{
        height: '60px',
        overflow: 'hidden',
        padding: 0.5,
        display: 'flex',
        alignItems: 'center',
        fontSize: 4,
        lineHeight: 5,
        color: 'primary.dark',
      }}
    >
      <Box sx={{ width: logoImageWidth, height: logoImageHeight }}>
        <LogoImage />
      </Box>
      <Box sx={{ width: logoTextWidth, height: logoTextHeight }}>
        <LogoText />
      </Box>
    </Box>
  );
};
