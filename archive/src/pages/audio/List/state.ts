import { IRes } from 'archive-types';
import * as api from 'api/audio';
import { IContAudio } from '@types';
import { atom, DefaultValue, selector } from 'recoil';
import { IContAudioParams } from 'archive-types';
import { format, subMonths } from 'date-fns';

export const audioListParams = atom<
  Omit<IContAudioParams, 'startDt' | 'endDt'> & {
    startDt?: Date;
    endDt?: Date;
  }
>({
  key: 'audioListParams',
  default: {
    size: 20,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  },
});

export const audioListState = atom<IContAudio[]>({
  key: 'audioListState',
  default: [],
});

/**
 * params 변경 => 오디오 목록 조회
 */
export const audioListSelector = selector<IRes<IContAudio>>({
  key: 'audioListSelector',
  get: async ({ get }) => {
    const params = get(audioListParams);
    const startDt = params.startDt
      ? format(params.startDt, 'yyyy-MM-dd')
      : undefined;
    const endDt = params.endDt ? format(params.endDt, 'yyyy-MM-dd') : undefined;
    const response = await api.getAudios({
      ...params,
      startDt,
      endDt,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (response.status === 200 && response.data.header.success) {
      return response.data;
    }

    throw true;
  },
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
    } else if (newValue.header.success) {
      const before = get(audioListState);
      const params = get(audioListParams);
      const newList = newValue.body!.list.map((item) => ({
        ...item,
        thumbFilePath: !item.thumbFilePath?.startsWith('http')
          ? `http://localhost:8080${item.thumbFilePath}`
          : item.thumbFilePath,
      }));
      set(
        audioListState,
        params.page === 1 ? newList : [...before, ...newList],
      );
    }
  },
});
