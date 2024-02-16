import { IRes } from 'http';

import * as api from 'api/photo';
import { IContPhoto } from 'dto';
import { atom, DefaultValue, selector } from 'recoil';

export const photoListQuery = atom<Record<string, string | number>>({
  key: 'photoListQuery',
  default: {},
});

export const photoListState = atom<IContPhoto[]>({
  key: 'photoListState',
  default: [],
});

/**
 * 비동기로 사진 목록 가져오기 (???)
 */
export const getPhotoList = selector<IRes<IContPhoto>>({
  key: 'getPhotoList',
  get: async () => {
    debugger;
    const response = await api.getPhotos();

    if (response.status === 200) {
      return response.data!;
    }

    throw true;
  },
  set({ set }, newValue) {
    debugger;
    if (newValue instanceof DefaultValue) {
      console.log('이게 뭐임??');
    } else {
      if (newValue.header.success) {
        set(photoListState, newValue.body!.list);
      }
    }
  },
});
