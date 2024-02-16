import { Box, Container, CssBaseline, useTheme } from '@mui/material';
import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const swidth = 64;

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
      <CssBaseline />
      <Container>
        <Box position="relative">
          <Sidebar width={swidth} />
          <Header />
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
