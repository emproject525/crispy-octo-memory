import { IRes } from 'archive-types';

import * as api from 'api/photo';
import { IContPhoto } from '@types';
import { IContPhotoParams } from 'archive-types';
import { atom, DefaultValue, selector } from 'recoil';
import { format, subMonths } from 'date-fns';

export const photoListParams = atom<
  Omit<IContPhotoParams, 'startDt' | 'endDt'> & {
    startDt?: Date;
    endDt?: Date;
  }
>({
  key: 'photoListParams',
  default: {
    size: 30,
    page: 1,
    startDt: subMonths(new Date(), 6),
    endDt: new Date(),
  },
});

export const photoListState = atom<IContPhoto[]>({
  key: 'photoListState',
  default: [],
});

/**
 * params 변경 => 사진 목록 조회
 */
export const photoListSelector = selector<IRes<IContPhoto>>({
  key: 'photoListSelector',
  get: async ({ get }) => {
    const params = get(photoListParams);
    const startDt = params.startDt
      ? format(params.startDt, 'yyyy-MM-dd')
      : undefined;
    const endDt = params.endDt ? format(params.endDt, 'yyyy-MM-dd') : undefined;
    const response = await api.getPhotos({
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
      const before = get(photoListState);
      const params = get(photoListParams);
      const newList = (newValue.body!.list || []).map((item) => ({
        ...item,
        filePath: !item.filePath?.startsWith('http')
          ? `http://localhost:8080${item.filePath}`
          : item.filePath,
      }));
      set(
        photoListState,
        params.page === 1 ? newList : [...before, ...newList],
      );
    }
  },
});
