import { Grid, Paper, Table, TableBody, TableContainer } from '@mui/material';
import MoreButton from 'pages/@components/button/MoreButton';
import React from 'react';
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  checkedState,
  checkTextOne,
  isCheckedAll,
  textListParams,
  textListSelector,
  textListState,
} from './state';

import TextSearchParams from './SearchParams';
import TextItemHead from './TextItemHead';
import TextItemRow from './TextItemRow';
import SearchCount from 'pages/@components/text/SearchCount';

const Inner = () => {
  const [params, setParams] = useRecoilState(textListParams);
  const [loadable, setTextList] = useRecoilStateLoadable(textListSelector);
  const checked = useRecoilValue(checkedState);
  const check = useSetRecoilState(checkTextOne);
  const checkedAll = useRecoilValue(isCheckedAll);
  const texts = useRecoilValue(textListState);
  const count = React.useMemo(
    () =>
      loadable.state === 'hasValue' ? loadable.contents.body?.count || 0 : 0,
    [loadable.contents.body?.count, loadable.state],
  );

  React.useEffect(() => {
    if (loadable.state === 'hasValue') {
      setTextList((cur) => cur);
    }
  }, [loadable.state, setTextList]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper
          sx={{
            px: 4,
          }}
        >
          <TextSearchParams />
          <SearchCount count={count} />
          <TableContainer>
            <Table aria-label="sticky table">
              <TextItemHead
                useCheckboxCell
                indeterminate={!checkedAll && checked.length > 0}
                checked={checkedAll}
                onCheck={(flag) => check(flag ? 'all' : 'uncheck')}
              />
              <TableBody>
                {texts.map((item) => (
                  <TextItemRow
                    useCheckboxCell
                    key={`text-${item.contId}`}
                    checked={
                      checked.findIndex((i) => i.contId === item.contId) > -1
                    }
                    onCheck={() => check(item)}
                    highlightText={params.keyword}
                    {...item}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
        </Paper>
      </Grid>
    </Grid>
  );
};

const TextList = () => (
  <RecoilRoot>
    <Inner />
  </RecoilRoot>
);

export default TextList;
