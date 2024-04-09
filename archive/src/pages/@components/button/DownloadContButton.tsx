import React from 'react';
import { ContType } from 'archive-types';

import {
  Box,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { download } from 'api/download';

/**
 * 컨텐츠 다운로드 버튼
 */
const DownloadContButton = ({
  contId,
  contType,
  title,
}: {
  contId: number;
  contType: ContType;
  title?: string;
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  return (
    <Box flexShrink={0} title="다운로드">
      <Tooltip
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        open={showTooltip}
        title={
          <Box px={2} py={1} minWidth={120}>
            {title && (
              <Typography variant="fs12" mb={1} component="div">
                {title}
              </Typography>
            )}
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="fs11" mt={1} color="grey.600" component="div">
              {progress}%
            </Typography>
          </Box>
        }
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  // arrow 없을 때 offset
                  // offset: [0, -15],
                  // arrow 있을 때 offset
                  offset: [0, -5],
                },
              },
            ],
          },
        }}
      >
        <IconButton
          color="info"
          sx={{
            p: 0.5,
          }}
          onClick={() => {
            if (progress !== 100) {
              download(
                {
                  contType,
                  contId,
                },
                {
                  onDownloadProgress: (progressEvent) => {
                    if (progressEvent.download) {
                      setShowTooltip(true);
                    }
                    setProgress(
                      Math.floor((progressEvent.progress || 0) * 100),
                    );
                  },
                },
              ).then(({ success }) => {
                if (!success) {
                  // 다운로드 실패 -> noti 추가
                }
              });
            } else {
              setShowTooltip((f) => !f);
            }
          }}
        >
          <DownloadRoundedIcon
            sx={{
              fontSize: 16,
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default DownloadContButton;
