import React from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { IContText } from '@types';
import DraggablePaper, { clickTrigger } from 'components/DraggablePaper';
import { getHighlight } from 'utils/utils';
import TextDetail from '../Detail';

export type TextItemRowProps = {
  checked: boolean;
  onCheck: () => void;
  /**
   * 체크박스셀 사용 여부
   */
  useCheckboxCell: boolean;
  /**
   * 하이라이트 키워드
   */
  highlight?: string;
  /**
   * 관련 아이템 여부
   */
  relItem?: boolean;
} & IContText;

/**
 * 문서 테이블 Body의 ROW 한줄
 * @param props TextItemRowProps
 * @returns JSX.Element
 */
const TextItemRow = (props: TextItemRowProps): JSX.Element => {
  const { checked, onCheck, useCheckboxCell, highlight, relItem, ...rest } =
    props;
  const { contId, contType, title, writers, regDt, modDt } = rest;
  const id = React.useMemo(() => `${contType}-${contId}`, [contId, contType]);

  // 셀 숨김
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

  // 상세 dialog 오픈
  const [open, setOpen] = React.useState(false);

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
          onClick={(e) => {
            const ele = document.getElementById(id);
            if (ele) {
              e.preventDefault();
              e.stopPropagation();
              if (relItem) {
                ele.dispatchEvent(clickTrigger);
              } else {
                ele.click();
              }
            } else {
              setOpen(true);
            }
          }}
          title={title}
          dangerouslySetInnerHTML={{
            __html: getHighlight(title || '', highlight),
          }}
        />
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

      {contId && (
        <DraggablePaper
          open={open}
          onClose={() => setOpen(false)}
          handleId={id}
          sx={{
            width: 600,
          }}
        >
          <TextDetail contId={contId} highlight={highlight} />
        </DraggablePaper>
      )}
    </>
  );
};

export default TextItemRow;
