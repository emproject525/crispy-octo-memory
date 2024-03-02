import {
  Box,
  Container,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from '@mui/material';
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
  const isSmallerThanLg = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Box
      bgcolor="background.default"
      minWidth={theme.breakpoints.values.sm}
      minHeight="100%"
      data-layout="default"
      display="flex"
      pb={15}
    >
      <CssBaseline />
      <Container
        maxWidth={isSmallerThanLg ? false : undefined}
        sx={{
          maxWidth: isSmallerThanLg ? 'calc(100% - 188px)' : undefined,
        }}
      >
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
