import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TextList from 'pages/text/List/TextList';
import PhotoList from 'pages/photo/List';
import VideoList from 'pages/video/List';
import AudioList from 'pages/audio/List';
import MiniTitle from 'components/Text/MiniTitle';

// 대시보드
// (좌측) 최신 문서 5개, 최신 사진 6개
// (우측) 최근 검색어 5개, 최신 영상 3개, 최신 오디오 3개
const Dashboard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <Box display="flex" flexDirection="column" gap={6}>
          <TextList
            title="문서 아카이브 현황"
            suppressSearch
            suppressMoreButton
            suppressCheckbox
            size={5}
          />
          <PhotoList
            title="사진 아카이브 현황"
            suppressSearch
            suppressMoreButton
            size={6}
          />
        </Box>
      </Grid>
      <Grid item xs={4}>
        {/* 4 */}
        <Box display="flex" flexDirection="column" gap={6}>
          <Paper
            sx={{
              px: 4,
            }}
          >
            <MiniTitle text="최근 검색어" />
          </Paper>
          <VideoList
            suppressMoreButton
            suppressSearch
            title="영상 아카이브 현황"
            size={3}
            rowCount={1}
          />
          <AudioList
            suppressMoreButton
            suppressSearch
            title="오디오 아카이브 현황"
            size={3}
            rowCount={1}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
