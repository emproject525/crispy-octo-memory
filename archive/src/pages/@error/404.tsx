import { useRouteError } from 'react-router';

import { Box } from '@mui/material';

const Error404 = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return <Box>{error}</Box>;
};

export default Error404;
