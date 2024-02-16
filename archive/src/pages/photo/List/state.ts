import { IRes } from 'http';

import * as api from 'api/photo';
import { IContPhoto } from 'dto';
import { IContPhotoParams } from 'params';
import { atom, selector } from 'recoil';

export const photoListParams = atom<IContPhotoParams>({
  key: 'photoListParams',
  default: {
    size: 40,
    page: 1,
  },
});

export const photoListState = atom<IContPhoto[]>({
  key: 'photoListState',
  default: [],
});

/**
 * 비동기로 사진 목록 가져오기 (???)
 */
export const asyncPhotoList = selector<IRes<IContPhoto>>({
  key: 'asyncPhotoList',
  get: async ({ get }) => {
    const response = await api.getPhotos(get(photoListParams));

    if (response.status === 200) {
      return response.data!;
    }

    throw true;
  },
  // set({ set }, newValue) {
  //   debugger;
  //   if (newValue instanceof DefaultValue) {
  //     console.log('이게 뭐임??');
  //   } else {
  //     if (newValue.header.success) {
  //       set(photoListState, newValue.body!.list);
  //     }
  //   }
  // },
});
