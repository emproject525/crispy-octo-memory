import React from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { IContText } from 'dto';
import TextDetailDialog from '../Detail/TextDetailDialog';

/**
 * 문서 테이블 Body의 ROW 한줄
 */
const TextItemRow = ({
  checked,
  onCheck,
  useCheckboxCell,
  ...rest
}: {
  checked: boolean;
  onCheck: () => void;
  /**
   * 체크박스셀 사용 여부
   */
  useCheckboxCell: boolean;
} & IContText) => {
  const { contId, title, writers, regDt, modDt } = rest;
  const [hideCell, setHideCell] = React.useState(false);
  const trRefCallback = React.useCallback((el: null | HTMLTableRowElement) => {
    if (el) {
      const { width } = el.getBoundingClientRect();
      setHideCell(width < 650);
    }
  }, []);

  // 상세 dialog 오픈
  const [openDetail, setOpenDetail] = React.useState(false);

  return (
    <>
      <TableRow ref={trRefCallback} hover>
        {useCheckboxCell && (
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
        )}
        <TableCell align="center" width={90}>
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
        {!hideCell && (
          <TableCell align="center" width={150}>
            {(writers || []).length < 2
              ? (writers || []).map((i) => i.name).join('')
              : `${writers![0].name} 외 ${writers!.length - 1}명`}
          </TableCell>
        )}
        {!hideCell && (
          <TableCell align="center" width={120}>
            {regDt || ''}
          </TableCell>
        )}
        {!hideCell && (
          <TableCell align="center" width={120}>
            {modDt || ''}
          </TableCell>
        )}
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
