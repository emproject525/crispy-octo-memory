import { IRes } from 'http';

import * as api from 'api/video';
import { IContVideo } from 'dto';
import { selector } from 'recoil';

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
