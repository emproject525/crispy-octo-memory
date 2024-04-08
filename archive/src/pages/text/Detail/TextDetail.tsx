import React from 'react';
import { Divider, Grid } from '@mui/material';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';

import TextHeader from './components/Header';
import TextRegDt from './components/RegDt';
import TextArchStatus from './components/ArchStatus';
import TextWriters from './components/Writers';
import TextBody from './components/Body';
import TextInfo from './components/Info';
import TextSubTitle from './components/SubTitle';
import TextMediaSource from './components/MediaSource';
import TextCopyrt from './components/Copyrt';
import TextKeyword from './components/Keyword';
import TextPayYnAdultYn from './components/PayYnAdultYn';
import TextRelations from './components/Relations';

import { textOneState } from './state';

export type TextDetailProps = {
  contId: number;
  highlight?: string;
};

const Inner = ({ contId, highlight }: TextDetailProps) => {
  useRecoilValueLoadable(textOneState(contId));

  return (
    <Grid container spacing={2}>
      <TextHeader contId={contId} highlight={highlight} />
      <TextRegDt contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <TextWriters contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <TextArchStatus contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <TextBody contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <TextInfo contId={contId} />
      <TextSubTitle contId={contId} />
      <TextMediaSource contId={contId} />
      <TextCopyrt contId={contId} />
      <TextKeyword contId={contId} />
      <TextPayYnAdultYn contId={contId} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <TextRelations contId={contId} />
    </Grid>
  );
};

const TextDetail = (props: TextDetailProps) => (
  <RecoilRoot>
    <Inner {...props} />
  </RecoilRoot>
);

export default TextDetail;
