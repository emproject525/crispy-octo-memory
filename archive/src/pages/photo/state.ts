import { IRes } from 'http';

import * as api from 'api/photo';
import { getRelations } from 'api/content';
import { IContPhoto, RelationType } from 'dto';
import { IContPhotoParams } from 'params';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

export const photoListParams = atom<IContPhotoParams>({
  key: 'photoListParams',
  default: {
    size: 30,
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
export const photoListSelector = selector<IRes<IContPhoto>>({
  key: 'photoListSelector',
  get: async ({ get }) => {
    const params = get(photoListParams);
    const response = await api.getPhotos(params);
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

/**
 * 비동기로 사진 가져오기
 */
export const photoSelector = selectorFamily<
  IRes<
    {
      relations: RelationType[];
    } & IContPhoto,
    false
  >,
  number
>({
  key: 'photoSelector',
  get: (contId) => async () => {
    const response = await api.getPhoto(contId);
    const relations = await getRelations({
      contType: 'P',
      contId,
    });
    // await new Promise((resolve) => setTimeout(resolve, 500));

    let returnBody:
      | undefined
      | (IContPhoto & {
          relations: RelationType[];
        }) = undefined;

    if (response.data.header.success) {
      returnBody = {
        ...response.data.body!,
        relations: relations.data.body?.list || [],
      };
      const path = returnBody.filePath;
      if (path) {
        returnBody.filePath = `http://localhost:8080${path}`;
      }
    }

    return {
      header: response.data.header,
      body: returnBody,
    };
  },
});
