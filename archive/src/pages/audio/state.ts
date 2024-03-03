import { IRes } from 'http';

import * as api from 'api/audio';
import { IContAudio } from 'dto';
import { selector } from 'recoil';

/**
 * 비동기 오디오 목록
 */
export const asyncAudioList = selector<IRes<IContAudio>>({
  key: 'asyncAudioList',
  get: async () => {
    const response = await api.getAudios();

    if (response.status === 200) {
      return response.data!;
    }

    throw true;
  },
});
