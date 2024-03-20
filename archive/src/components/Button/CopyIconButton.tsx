import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';

/**
 * 복사 아이콘 버튼
 */
const CopyIconButton = ({
  title,
  copyText,
  position,
}: {
  title: string;
  copyText: string;
  position?: 'right' | 'left';
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box position="relative">
        <IconButton
          sx={{
            width: 20,
            height: 20,
            p: 0.6,
          }}
          title={title}
          onClick={() => {
            setOpen(true);
            copy(copyText);
          }}
        >
          <ContentCopyIcon
            sx={{
              fontSize: 14,
            }}
          />
        </IconButton>
        {open && (
          <Box
            position="absolute"
            bgcolor="rgba(0, 0, 0, 0.65)"
            color="white"
            px={2}
            py={1}
            borderRadius={1}
            sx={{
              cursor: 'default',
              userSelect: 'none',
              zIndex: 2,
              ...(position && {
                left: -72,
              }),
            }}
          >
            <Typography component="p" variant="fs12">
              복사하였습니다.
            </Typography>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

CopyIconButton.defaultProps = {
  position: 'right',
};

export default CopyIconButton;
