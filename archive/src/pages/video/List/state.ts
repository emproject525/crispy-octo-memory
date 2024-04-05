import { IRes, IContVideoParams } from 'archive-types';
import { IContVideo } from '@types';
import { atom, DefaultValue, selector } from 'recoil';
import * as api from 'api/video';
import { format, subMonths } from 'date-fns';

export const videoListParams = atom<
  Omit<IContVideoParams, 'startDt' | 'endDt'> & {
    startDt?: Date;
    endDt?: Date;
  }
>({
  key: 'videoListParams',
  default: {
    size: 20,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  },
});

export const videoListState = atom<IContVideo[]>({
  key: 'videoListState',
  default: [],
});

/**
 * params 변경 => 영상 목록 조회
 */
export const videoListSelector = selector<IRes<IContVideo>>({
  key: 'videoListSelector',
  get: async ({ get }) => {
    const params = get(videoListParams);
    const startDt = params.startDt
      ? format(params.startDt, 'yyyy-MM-dd')
      : undefined;
    const endDt = params.endDt ? format(params.endDt, 'yyyy-MM-dd') : undefined;
    const response = await api.getVideos({
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
      const before = get(videoListState);
      const params = get(videoListParams);
      const newList = newValue.body!.list.map((item) => ({
        ...item,
        thumbFilePath: !item.thumbFilePath?.startsWith('http')
          ? `http://localhost:8080${item.thumbFilePath}`
          : item.thumbFilePath,
      }));
      set(
        videoListState,
        params.page === 1 ? newList : [...before, ...newList],
      );
    }
  },
});
