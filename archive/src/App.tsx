import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from 'assets/theme';
import router from 'pages/router';

/**
 * Archive App
 * @returns JSX.Element
 */
const App = () => {
  const muiTheme = React.useMemo(() => theme('dark'), []);
  return (
    <ThemeProvider theme={muiTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
