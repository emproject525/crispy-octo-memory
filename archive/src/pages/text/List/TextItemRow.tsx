import React from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { IContText } from 'dto';
import TextDetailDialog from '../Detail/TextDetailDialog';

const TextItemRow = ({
  checked,
  onCheck,
  ...rest
}: {
  checked: boolean;
  onCheck: () => void;
} & IContText) => {
  const { contId, title, writers, regDt, modDt } = rest;

  // 상세 dialog 오픈
  const [openDetail, setOpenDetail] = React.useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell padding="checkbox" width={60}>
          <Checkbox
            color="primary"
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            checked={checked}
            onChange={onCheck}
          />
        </TableCell>
        <TableCell align="center" width={100}>
          {contId}
        </TableCell>
        <TableCell
          align="left"
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => setOpenDetail(true)}
          title={title}
        >
          {title || ''}
        </TableCell>
        <TableCell align="center" width={150}>
          {(writers || []).length < 2
            ? (writers || []).map((i) => i.name).join('')
            : `${writers![0].name} 외 ${writers!.length - 1}명`}
        </TableCell>
        <TableCell align="center" width={120}>
          {regDt || ''}
        </TableCell>
        <TableCell align="center" width={120}>
          {modDt || ''}
        </TableCell>
      </TableRow>

      <TextDetailDialog
        open={openDetail}
        contId={contId}
        onClose={() => setOpenDetail(false)}
      />
    </>
  );
};

export default TextItemRow;
