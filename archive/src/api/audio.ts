import { IContAudioParams } from 'archive-types';
import { IContAudio } from '@types';

import client from './client';

/**
 * 오디오 목록
 * @returns axios
 */
export const getAudios = (params: IContAudioParams) => {
  return client.get<IContAudio>('/api/audios', {
    params,
  });
};

/**
 * 오디오 상세
 * @param contId 컨텐츠ID
 * @returns axios
 */
export const getAudio = (contId: number) => {
  return client.get<IContAudio, IContAudio, false>(`/api/audios/${contId}`);
};
