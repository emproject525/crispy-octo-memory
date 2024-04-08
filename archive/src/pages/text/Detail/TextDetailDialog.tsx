import React from 'react';
import DraggablePaper from 'components/DraggablePaper';

import TextDetail, { TextDetailProps } from './TextDetail';
import { useSetRecoilState } from 'recoil';
import { closeContent, viewContent } from 'pages/rootState';

/**
 * 문서 상세를 dialog 처럼 노출
 */
const TextDetailDialog = (
  props: {
    /**
     * unique key
     */
    id: string;
    open: boolean;
    onClose: () => void;
  } & TextDetailProps,
) => {
  const { id, contId, open, onClose, highlightText } = props;

  const view = useSetRecoilState(viewContent);
  const close = useSetRecoilState(closeContent);

  React.useEffect(() => {
    if (open) {
      view({
        contType: 'T',
        contId,
      });
    } else {
      close({
        contType: 'T',
        contId,
      });
    }
  }, [close, contId, open, view]);

  return (
    <DraggablePaper
      key={id}
      open={open}
      onClose={onClose}
      handleId={id}
      sx={{
        width: 600,
      }}
    >
      <TextDetail contId={contId} highlightText={highlightText} />
    </DraggablePaper>
  );
};

export default TextDetailDialog;
