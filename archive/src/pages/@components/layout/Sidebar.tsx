import { useNavigate } from 'react-router';

import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Box, IconButton, useTheme } from '@mui/material';
import menus from 'assets/sample/menus.json';
import React from 'react';

const Sidebar = ({ width }: { width: number }) => {
  const [menuId, setMenuId] = React.useState(menus[0].menuId);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      width={width}
      data-sidebar
      position="absolute"
      sx={{
        zIndex: 1,
        left: `-${width}px`,
      }}
    >
      <Box
      // position="fixed"
      // sx={{
      //   left: 0,
      //   top: 0,
      //   bottom: 0,
      //   width,
      // }}
      >
        <Box height={250}></Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
          px={2}
        >
          {menus.map((item) => (
            <IconButton
              key={`menu-icon-${item.menuId}`}
              data-id={item.menuId}
              title={item.menuKoNm}
              sx={{
                p: 2.5,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.grey[600],
              }}
              onClick={() => navigate(item.path)}
            >
              {item.menuNm === 'dashboard' ? (
                <DashboardCustomizeRoundedIcon fontSize="small" />
              ) : item.menuNm === 'document' ? (
                <FeedRoundedIcon fontSize="small" />
              ) : item.menuNm === 'photo' ? (
                <PhotoLibraryIcon fontSize="small" />
              ) : undefined}
            </IconButton>
          ))}
        </Box>

        {/* <Tabs
          orientation="vertical"
          variant="scrollable"
          value={menuId}
          onChange={(evt, clicked) => setMenuId(clicked)}
          aria-label="vertical-menu"
        >
          {menus.map((item) => (
            <Tab
              value={item.menuId}
              key={`menu-icon-${item.menuId}`}
              icon={
                item.menuNm === 'dashboard' ? (
                  <DashboardCustomizeRoundedIcon />
                ) : item.menuNm === 'article' ? (
                  <FeedRoundedIcon />
                ) : item.menuNm === 'photo' ? (
                  <PhotoLibraryIcon />
                ) : undefined
              }
              sx={{
                [`&.${tabClasses.root}`]: {
                  padding: 0,
                  minWidth: width,
                  maxWidth: width,
                },
              }}
            />
          ))}
        </Tabs> */}
      </Box>
    </Box>
  );
};

export default Sidebar;
