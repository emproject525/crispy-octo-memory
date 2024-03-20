import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  IconButton,
  Paper,
  PaperProps,
  Portal,
  useTheme,
} from '@mui/material';
import Draggable from 'react-draggable';
import StyledScrollBox from 'components/StyledScrollBox';

/**
 * Portal + 드래그 가능한 Paper
 */
const DraggablePaper = ({
  handleId,
  open,
  onClose,
  children,
  sx,
  ...rest
}: { handleId: string; open: boolean; onClose: () => void } & PaperProps) => {
  const nodeRef = React.useRef<HTMLDivElement | null>(null);
  const nodeRefCallback = React.useCallback((ele: HTMLDivElement | null) => {
    if (ele) {
      const observer = new ResizeObserver((entries) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _entry of entries) {
          const { width, height } = ele.getBoundingClientRect();

          setBounds({
            top: 0,
            left: 0,
            // 스크롤바 신경써야됨 킹에바
            right: window.innerWidth - width - 40 * 2 - 16,
            bottom: window.innerHeight - height - 40 * 2,
          });
        }
      });

      observer.observe(document.body);
      observer.observe(ele);
      nodeRef.current = ele;
    }
  }, []);
  const theme = useTheme();
  const [bounds, setBounds] = React.useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <Draggable
        nodeRef={nodeRef}
        handle={`#${handleId}`}
        // cancel={'[class*="MuiPaper-root"]'}
        scale={1}
        // bounds="html"
        bounds={bounds}
        axis="both"
      >
        <Paper
          ref={nodeRefCallback}
          sx={{
            position: 'fixed',
            maxHeight: `calc(100vh - ${theme.spacing(20)})`,
            maxWidth: `calc(100vw - ${theme.spacing(20)})`,
            overflow: 'hidden',
            zIndex: 1499,
            p: 0,
            ...sx,
            top: theme.spacing(10),
            left: theme.spacing(10),
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
          elevation={5}
          {...rest}
        >
          <Box
            id={handleId}
            width="100%"
            sx={{
              cursor: 'move',
              p: 2,
            }}
            display="flex"
            justifyContent="flex-end"
          >
            <IconButton title="Close" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <StyledScrollBox
            flex={1}
            sx={{
              overflowY: 'auto',
              overscrollBehavior: 'contain',
            }}
            mb={5}
          >
            {children}
          </StyledScrollBox>
        </Paper>
      </Draggable>
    </Portal>
  );
};

export default DraggablePaper;
