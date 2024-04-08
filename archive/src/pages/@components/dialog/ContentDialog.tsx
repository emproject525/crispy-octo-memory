import { closeContent, viewContent } from 'pages/rootState';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const ContentDialog = () => {
  const view = useSetRecoilState(viewContent);
  const close = useSetRecoilState(closeContent);
};

export default ContentDialog;
