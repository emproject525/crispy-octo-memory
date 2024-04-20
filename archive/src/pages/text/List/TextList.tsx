import React from 'react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';

import { IContTextParams } from 'archive-types';

import MoreButton from 'pages/@components/button/MoreButton';
import {
  checkedState,
  checkTextOne,
  isCheckedAll,
  textListResponse,
  textListState,
  textParamsState,
} from './state';

import TextSearchParams from './SearchParams';
import TextItemHead from './TextItemHead';
import TextItemRow from './TextItemRow';
import SearchCount from 'pages/@components/text/SearchCount';
import MiniTitle from 'components/Text/MiniTitle';

export type TextListProps = {
  /**
   * 검색 기능 막기
   */
  suppressSearch?: boolean;
  /**
   * 더보기 기능 막기
   */
  suppressMoreButton?: boolean;
  /**
   * 체크박스 막기
   */
  suppressCheckbox?: boolean;
  /**
   * 타이틀
   */
  title?: string;
  /**
   * 목록 한 페이지 개수
   */
  size?: IContTextParams['size'];
};

/**
 * @see https://blog.rhostem.com/posts/2021-07-07-state-management-with-recoil-atomfamily
 */
const Inner = (props: TextListProps) => {
  const { title, suppressSearch, suppressMoreButton, suppressCheckbox, size } =
    props;
  const [params, setParams] = useRecoilState(
    textParamsState({
      size,
    }),
  );
  const [loadable, changeListState] = useRecoilStateLoadable(
    textListResponse({
      size,
    }),
  );
  const checked = useRecoilValue(checkedState);
  const check = useSetRecoilState(checkTextOne);
  const checkedAll = useRecoilValue(isCheckedAll);
  const texts = useRecoilValue(textListState);
  const count = React.useMemo(
    () => (loadable.state === 'hasValue' ? loadable.contents.count : 0),
    [loadable.contents.count, loadable.state],
  );

  React.useEffect(() => {
    if (loadable.state === 'hasValue') {
      changeListState((cur) => cur);
    }
  }, [changeListState, loadable.state]);

  return (
    <Paper
      sx={{
        px: 4,
      }}
    >
      {title && (
        <MiniTitle
          text={title}
          sx={{
            mb: 3,
          }}
        />
      )}
      {!suppressSearch && (
        <>
          <TextSearchParams
            disabled={loadable.state === 'loading'}
            searchParams={params}
            changeParams={(newParams) =>
              setParams((before) => ({
                ...before,
                ...newParams,
              }))
            }
          />
          <SearchCount count={count} />
        </>
      )}
      <TableContainer>
        <Table aria-label="sticky table">
          <TextItemHead
            useCheckboxCell={!suppressCheckbox}
            indeterminate={!checkedAll && checked.length > 0}
            checked={checkedAll}
            onCheck={(flag) => check(flag ? 'all' : 'uncheck')}
          />
          <TableBody>
            {texts.map((item) => (
              <TextItemRow
                useCheckboxCell={!suppressCheckbox}
                key={`text-${item.contId}`}
                checked={
                  checked.findIndex((i) => i.contId === item.contId) > -1
                }
                onCheck={() => check(item)}
                highlight={params.keyword}
                {...item}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!suppressMoreButton && (
        <MoreButton
          loading={loadable.state === 'loading'}
          count={count}
          size={params.size}
          page={params.page}
          onClick={(nextPage) =>
            setParams((p) => ({
              ...p,
              page: nextPage,
            }))
          }
        />
      )}
    </Paper>
  );
};

const TextList = (props: TextListProps) => (
  <RecoilRoot>
    <Inner {...props} />
  </RecoilRoot>
);

export default TextList;
