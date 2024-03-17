import {
  useTheme,
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
} from 'recoil';
import { textListParams, textListSelector, textListState } from '../state';

const Inner = () => {
  const [params, setParams] = useRecoilState(textListParams);
  const [loadable, setTextList] = useRecoilStateLoadable(textListSelector);
  const texts = useRecoilValue(textListState);
  const theme = useTheme();

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
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" width={60}>
                    <Checkbox
                      color="primary"
                      // indeterminate={numSelected > 0 && numSelected < rowCount}
                      // checked={rowCount > 0 && numSelected === rowCount}
                      // onChange={onSelectAllClick}
                      inputProps={{
                        'aria-label': 'select all desserts',
                      }}
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
                {texts.map((item) => {
                  return (
                    <TableRow key={`text-${item.contId}`}>
                      <TableCell padding="checkbox" width={60}>
                        <Checkbox
                          color="primary"
                          // indeterminate={numSelected > 0 && numSelected < rowCount}
                          // checked={rowCount > 0 && numSelected === rowCount}
                          // onChange={onSelectAllClick}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" width={100}>
                        {item.contId}
                      </TableCell>
                      <TableCell align="left">{item.title || ''}</TableCell>
                      <TableCell align="center" width={150}>
                        {(item.writers || []).length < 2
                          ? (item.writers || []).map((i) => i.name).join('')
                          : `${item.writers![0].name} 외 ${
                              item.writers!.length - 1
                            }명`}
                      </TableCell>
                      <TableCell align="center" width={120}>
                        {item.regDt || ''}
                      </TableCell>
                      <TableCell align="center" width={120}>
                        {item.modDt || ''}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
