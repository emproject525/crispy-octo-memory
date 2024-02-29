import { IContVideo } from 'dto';

import client from './client';

/**
 * 영상 목록
 * @returns axios
 */
export const getVideos = () => {
  return client.get<IContVideo>('/api/videos');
};

/**
 * 영상 상세
 * @param contId 컨텐츠ID
 * @returns axios
 */
export const getVideo = (contId: number) => {
  return client.get<IContVideo, IContVideo, false>(`/api/videos/${contId}`);
};
