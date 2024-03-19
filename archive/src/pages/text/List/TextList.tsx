import {
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
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
  checkTextList,
  isCheckedAll,
  textListParams,
  textListSelector,
  textListState,
} from '../state';

import TextItemRow from './TextItemRow';

const Inner = () => {
  const [params, setParams] = useRecoilState(textListParams);
  const [loadable, setTextList] = useRecoilStateLoadable(textListSelector);
  const checked = useRecoilValue(checkedState);
  const check = useSetRecoilState(checkTextList);
  const checkedAll = useRecoilValue(isCheckedAll);
  const texts = useRecoilValue(textListState);

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
          <TableContainer>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" width={60}>
                    <Checkbox
                      color="primary"
                      inputProps={{
                        'aria-label': 'select all desserts',
                      }}
                      indeterminate={!checkedAll && checked.length > 0}
                      checked={checkedAll}
                      onChange={(evt, flag) => check(flag ? 'all' : 'uncheck')}
                    />
                  </TableCell>
                  <TableCell align="center" width={100}>
                    ID
                  </TableCell>
                  <TableCell align="left">제목</TableCell>
                  <TableCell align="center" width={150}>
                    작성자
                  </TableCell>
                  <TableCell align="center" width={120}>
                    등록일
                  </TableCell>
                  <TableCell align="center" width={120}>
                    수정일
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {texts.map((item) => (
                  <TextItemRow
                    key={`text-${item.contId}`}
                    checked={
                      checked.findIndex((i) => i.contId === item.contId) > -1
                    }
                    onCheck={() => check(item)}
                    {...item}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <MoreButton
            loading={loadable.state === 'loading'}
            count={
              loadable.state === 'hasValue'
                ? loadable.contents.body?.count || 0
                : 0
            }
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
