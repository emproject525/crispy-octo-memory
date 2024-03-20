import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

/**
 * 문서 테이블의 헤드
 */
const TextItemHead = ({
  useCheckboxCell,
  indeterminate,
  checked,
  onCheck,
}: {
  useCheckboxCell: boolean;
  indeterminate: boolean;
  checked: boolean;
  onCheck: (check: boolean) => void;
}) => {
  const [hideCell, setHideCell] = React.useState(false);
  const trRefCallback = React.useCallback((el: null | HTMLTableRowElement) => {
    if (el) {
      const observer = new ResizeObserver((entries) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _entry of entries) {
          const { width } = el.getBoundingClientRect();
          setHideCell(width < 1000);
        }
      });

      observer.observe(el);
    }
  }, []);

  return (
    <TableHead>
      <TableRow ref={trRefCallback}>
        {useCheckboxCell && (
          <TableCell padding="checkbox" width={60}>
            <Checkbox
              color="primary"
              inputProps={{
                'aria-label': 'select all desserts',
              }}
              indeterminate={indeterminate}
              checked={checked}
              onChange={(evt, flag) => onCheck(flag)}
            />
          </TableCell>
        )}
        <TableCell align="center" width={90}>
          ID
        </TableCell>
        <TableCell align="left">제목</TableCell>
        {!hideCell && (
          <TableCell align="center" width={150}>
            작성자
          </TableCell>
        )}
        {!hideCell && (
          <TableCell align="center" width={120}>
            등록일
          </TableCell>
        )}
        {!hideCell && (
          <TableCell align="center" width={120}>
            수정일
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default TextItemHead;
