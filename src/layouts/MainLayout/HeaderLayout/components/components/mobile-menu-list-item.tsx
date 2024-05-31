import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SxProps } from '@mui/system';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { MobileListItem } from '../mobile-menu';

type MobileMenuListItemProps = {
  userCollapse: boolean;
  handleUserCollapse: () => void;
  item: MobileListItem;
  listItemStyle?: SxProps;
};

export const MobileMenuListItem: React.FC<MobileMenuListItemProps> = ({
  userCollapse,
  handleUserCollapse,
  item,

  listItemStyle,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState('');
  const toggleColor = {
    icon: { active: 'secondary.light', inactive: grey[400] },
    text: { active: 'white', inactive: grey[400] },
  };

  const handleMouseEnter = (text: string) => {
    setIsHovered(text);
  };
  const handleMouseLeave = () => {
    setIsHovered('');
  };

  // color 在
  const activeItemStyle = (text: string, item: 'text' | 'icon') => {
    const color =
      isHovered === text || isActive === true
        ? toggleColor[item].active
        : toggleColor[item].inactive;

    return color;
  };

  const pathname = usePathname();
  useEffect(() => {
    if (pathname === item.href) setIsActive(true);
  }, [isActive]);

  return (
    <ListItem
      disablePadding
      onClick={() => {
        setIsActive((prev) => !prev);
      }}
    >
      <ListItemButton
        sx={{
          padding: 0,
          py: 0.75,
          px: 2,
          borderRadius: 8,
        }}
        LinkComponent={NextLink}
        onClick={item.name === 'User' ? handleUserCollapse : undefined}
        href={item.name === 'User' ? '' : item.href}
        onMouseEnter={() => {
          handleMouseEnter(item.name);
        }}
        onMouseLeave={handleMouseLeave}
      >
        <ListItemIcon
          className="mobile-menu-icon"
          sx={{
            transition: '0.2s color',
            color: activeItemStyle(item.name, 'icon'),

            ...listItemStyle,
          }}
        >
          {item.icon}
        </ListItemIcon>

        <ListItemText
          className="mobile-menu-text"
          primary={item.name}
          sx={{
            color: activeItemStyle(item.name, 'text'),
          }}
        />

        {/* add collapse arrow after the list item */}
        {item.name === 'User' &&
          (userCollapse ? (
            <ExpandLess
              sx={{
                color: activeItemStyle(item.name, 'text'),
              }}
            />
          ) : (
            <ExpandMore
              sx={{
                color: activeItemStyle(item.name, 'text'),
              }}
            />
          ))}
      </ListItemButton>
    </ListItem>
  );
};
