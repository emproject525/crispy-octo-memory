import { IContVideo } from 'dto';

import client from './client';

/**
 * 영상 목록
 * @returns axios
 */
export const getVideos = () => {
  return client.get<IContVideo>('/api/videos');
};
