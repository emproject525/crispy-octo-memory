import { Box, useTheme } from '@mui/material';
import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const swidth = 48;

/**
 * Layout (sidebar + appbar + searchbar + ...children)
 * @param param0.children children
 * @returns JSX.Element
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor="background.default"
      minWidth={theme.breakpoints.values.sm}
      minHeight="100%"
      data-layout="default"
      display="flex"
    >
      <Sidebar width={swidth} />
      <Box flex={1}>
        <Header />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
