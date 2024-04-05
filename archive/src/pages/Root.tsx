import { Outlet } from 'react-router';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import Layout from './@components/layout';
import { serverCodeMap } from './rootState';

const Inner = () => {
  useRecoilValueLoadable(serverCodeMap);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

/**
 * Root
 * @returns JSX.Element
 */
const Root = () => (
  <RecoilRoot>
    <Inner />
  </RecoilRoot>
);

export default Root;
