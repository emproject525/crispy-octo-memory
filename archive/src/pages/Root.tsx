import { Outlet } from 'react-router';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import Layout from './@components/layout';
import ScrollToTop from 'components/ScrollToTop';
import { serverCodeMap } from './rootState';

const Inner = () => {
  useRecoilValueLoadable(serverCodeMap);

  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  );
};

/**
 * Root
 * @returns JSX.Element
 */
const Root = () => (
  <RecoilRoot override={false}>
    <Inner />
  </RecoilRoot>
);

export default Root;
