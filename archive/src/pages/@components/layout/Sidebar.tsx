import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { Box, Tab, Tabs, tabClasses } from '@mui/material';
import menus from 'assets/sample/menus.json';
import React from 'react';

const Sidebar = ({ width }: { width: React.CSSProperties['width'] }) => {
  const [menuId, setMenuId] = React.useState(menus[0].menuId);

  return (
    <Box width={width} data-sidebar>
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
        <Tabs
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
        </Tabs>
      </Box>
    </Box>
  );
};

export default Sidebar;
