import { NavLink } from 'react-router-dom';

import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  alpha,
  Box,
  IconButton,
  useTheme,
  svgIconClasses,
} from '@mui/material';
import menus from 'assets/sample/menus.json';
import React from 'react';

const basetop = 250;
const mintop = 60;

const Sidebar = ({ width }: { width: number }) => {
  // const [menuId, setMenuId] = React.useState(menus[0].menuId);
  const theme = useTheme();
  const target = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener('scroll', function () {
      if (target.current) {
        // 인라인 스타일을 수정하면 getBoundingClientRect로 얻는 top이 인라인 스타일 top과 동일하지 않는 문제가 있음
        const { y, height } = target.current.getBoundingClientRect();

        const top = Number(
          (target.current.style.top || `${basetop}px`).slice(0, -2),
        );
        const bottom = top + height;

        if (window.scrollY === 0 || top < basetop) {
          target.current.style.setProperty('top', `${basetop}px`);
        } else if (y < mintop) {
          target.current.style.setProperty(
            'top',
            `${mintop + window.scrollY}px`,
          );
        } else if (bottom > window.scrollY + window.innerHeight - mintop) {
          // 스크롤의 끝에 bottom 걸린 경우
          // window.scrollY + window.innerHeight = document 시작부터 현재 스크롤까지 높이
          target.current.style.setProperty(
            'top',
            `${window.scrollY + window.innerHeight - mintop - height}px`,
          );
        } else if (bottom > document.body.scrollHeight - mintop) {
          // bottom이 페이지 맨 끝에 옴
          target.current.style.setProperty(
            'top',
            `${document.body.scrollHeight - mintop}px`,
          );
        }
      }
    });
  }, []);

  return (
    <Box
      width={width}
      data-sidebar
      position="absolute"
      sx={{
        zIndex: 1,
        height: '100%',
        left: `-${width}px`,
      }}
    >
      <Box position="relative" width="100%" height="100%">
        <Box
          ref={target}
          position="absolute"
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
          px={2}
          sx={{
            top: basetop,
            transition: 'top .25s',
          }}
        >
          {menus.map((item) => (
            <NavLink
              to={item.path || ''}
              key={`menu-icon-${item.menuId}`}
              preventScrollReset={false}
            >
              {({ isActive }) => (
                <IconButton
                  id={`menuid-${item.menuId}`}
                  title={item.menuKoNm}
                  sx={{
                    p: 2.5,
                    bgcolor: alpha(
                      isActive
                        ? theme.palette.success.main
                        : theme.palette.background.paper,
                      0.8,
                    ),
                    color: isActive
                      ? theme.palette.grey[800]
                      : theme.palette.grey[600],
                    '&:hover': {
                      bgcolor: isActive
                        ? theme.palette.success.main
                        : theme.palette.background.paper,
                    },
                  }}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                    })
                  }
                >
                  {item.menuNm === 'dashboard' ? (
                    <DashboardCustomizeRoundedIcon fontSize="small" />
                  ) : item.menuNm === 'text' ? (
                    <FeedRoundedIcon fontSize="small" />
                  ) : item.menuNm === 'photo' ? (
                    <PhotoLibraryIcon fontSize="small" />
                  ) : item.menuNm === 'video' ? (
                    <VideoLibraryIcon fontSize="small" />
                  ) : item.menuNm === 'audio' ? (
                    <LibraryMusicIcon fontSize="small" />
                  ) : null}
                </IconButton>
              )}
            </NavLink>
          ))}
          <IconButton
            sx={{
              p: 2.5,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.grey[600],
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            title="To the top"
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              p: 2.5,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.grey[600],
            }}
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }
            title="To the bottom"
          >
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              p: 2.5,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.grey[600],
              [`&:hover .${svgIconClasses.root}`]: {
                animation: 'spin 4s linear infinite',
              },
            }}
            title="settings"
          >
            <SettingsIcon
              fontSize="small"
              sx={{
                '@keyframes spin': {
                  '0%': {
                    transform: 'rotate(360deg)',
                  },
                  '100%': {
                    transform: 'rotate(0deg)',
                  },
                },
              }}
            />
          </IconButton>
        </Box>

        {/* <Tabs
          orientation="vertical"
          variant="scrollable"
          value={menuId}
          onChange={(evt, clicked) => setMenuId(clicked)}
          aria-label="vertical-menu"
        >
          {menus.map((item) => (
            <Tab
              value={item.menuId}
              key={`menu-icon-${item.menuId}`}
              icon={
                item.menuNm === 'dashboard' ? (
                  <DashboardCustomizeRoundedIcon />
                ) : item.menuNm === 'article' ? (
                  <FeedRoundedIcon />
                ) : item.menuNm === 'photo' ? (
                  <PhotoLibraryIcon />
                ) : undefined
              }
              sx={{
                [`&.${tabClasses.root}`]: {
                  padding: 0,
                  minWidth: width,
                  maxWidth: width,
                },
              }}
            />
          ))}
        </Tabs> */}
      </Box>
    </Box>
  );
};

export default Sidebar;
