import { IRes } from 'http';

import * as api from 'api/video';
import { IContVideo } from 'dto';
import { selector, selectorFamily } from 'recoil';

/**
 * 비동기 영상 목록
 */
export const asyncVideoList = selector<IRes<IContVideo>>({
  key: 'asyncVideoList',
  get: async () => {
    const response = await api.getVideos();

    if (response.status === 200) {
      return response.data!;
    }

    throw true;
  },
});

/**
 * 비동기 영상 1개
 */
export const asyncVideo = selectorFamily<IRes<IContVideo, false>, number>({
  key: 'asyncVideo',
  get: (contId) => async () => {
    const response = await api.getVideo(contId);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (response.data.header.success) {
      const mediaType = response.data.body!.mediaType;
      const path = response.data.body!.filePath;

      if (mediaType === '00') {
        response.data.body!.filePath = `http://localhost:8080/stream/${contId}`;
      } else if (path && mediaType === '01') {
        response.data.body!.filePath = `https://www.youtube.com/embed${response.data.body!.filePath.replace(
          /(.*)(\/.*)/,
          '$2',
        )}`;
      }
    }

    return response.data;
  },
});
