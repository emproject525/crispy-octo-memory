import { IContAudio } from 'dto';

import client from './client';

/**
 * 오디오 목록
 * @returns axios
 */
export const getAudios = () => {
  return client.get<IContAudio>('/api/audios');
};

/**
 * 오디오 상세
 * @param contId 컨텐츠ID
 * @returns axios
 */
export const getAudio = (contId: number) => {
  return client.get<IContAudio, IContAudio, false>(`/api/audios/${contId}`);
};
