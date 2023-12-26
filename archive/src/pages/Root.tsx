import { Outlet } from 'react-router';

import Layout from './@components/layout';

/**
 * Root
 * @returns JSX.Element
 */
const Root = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Root;
