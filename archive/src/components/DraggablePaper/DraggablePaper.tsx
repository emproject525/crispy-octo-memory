import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  // alpha,
  Box,
  IconButton,
  Paper,
  PaperProps,
  Portal,
  useTheme,
} from '@mui/material';
import Draggable from 'react-draggable';
import StyledScrollBox from 'components/StyledScrollBox';

export const clickTrigger = new CustomEvent('clickTrigger', {
  detail: {
    name: 'click',
  },
});

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

      // 클릭 시 z-index 조정
      ele.addEventListener('click', () => {
        document.querySelectorAll('[data-dialog]').forEach((other) => {
          (other as HTMLDivElement).style.setProperty('z-index', '1499');
        });
        ele.style.setProperty('z-index', '1500');
      });

      // 클릭이 trigger된 경우 z-index 조정 + 스크롤 탑 (customEvent)
      ele.addEventListener('clickTrigger', () => {
        ele.click();
        ele.querySelector('[data-dialog-scrollbody]')?.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });

      // blur 시 z-index 조정
      ele.addEventListener('blur', (e) => {
        e.stopPropagation();

        let isOwn = false; // 본인을 클릭해서 트리거된건지
        let isChild = false; // 자식들을 클릭해서 트리거된건지
        let isOut = false; // 밖을 클릭해서 트리거된건지

        // currentTarget = 이벤트 걸린 곳 (부모까지 찾아감)
        // target = 이벤트 트리거한 현재 엘리먼트
        // relatedTarget = 이벤트 발생 시 마우스 근처 엘리먼트

        if (e.currentTarget) {
          // target이 currentTarget의 자식인지 확인
          (e.currentTarget as HTMLDivElement)
            .querySelectorAll('*')
            ?.forEach((ch) => {
              isChild =
                (e.relatedTarget
                  ? ch.isSameNode(e.relatedTarget as HTMLElement)
                  : ch.isSameNode(e.target as HTMLElement)) || isChild;
            });
        }

        if (!isChild) {
          // 트리거한 엘리먼트가 target 본인인지 확인
          isOwn = e.currentTarget === e.target;

          // 커서가 완전 밖으로 나갔는지 확인
          isOut =
            e.relatedTarget === null ||
            !(e.relatedTarget as HTMLDivElement).isSameNode(
              e.currentTarget as HTMLElement,
            );

          if (isOut || isOwn) {
            ele.style.setProperty('z-index', '1499');
          }
        }
      });

      ele.click();
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
    <Portal key={handleId}>
      <Draggable
        nodeRef={nodeRef}
        handle={`#${handleId}-handle`}
        // cancel={'[class*="MuiPaper-root"]'}
        scale={1}
        // bounds="html"
        bounds={bounds}
        axis="both"
      >
        <Paper
          ref={nodeRefCallback}
          tabIndex={-1}
          id={handleId}
          data-dialog="true"
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
            id={`${handleId}-handle`}
            width="100%"
            sx={{
              cursor: 'move',
              p: 2,
            }}
            display="flex"
            justifyContent="flex-end"
          >
            <IconButton
              title="Close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <StyledScrollBox
            flex={1}
            data-dialog-scrollbody="true"
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
