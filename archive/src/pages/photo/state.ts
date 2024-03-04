import { IRes } from 'http';

import * as api from 'api/photo';
import { getRelations } from 'api/content';
import { IContPhoto, RelationType } from 'dto';
import { IContPhotoParams } from 'params';
import { atom, selector, selectorFamily } from 'recoil';

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

    if (response.status === 200 && response.data.header.success) {
      return {
        header: response.data.header,
        body: {
          count: response.data.body!.count,
          keywords: response.data.body!.keywords,
          list: response.data.body!.list.map((item) => ({
            ...item,
            filePath: !item.filePath?.startsWith('http')
              ? `http://localhost:8080${item.filePath}`
              : item.filePath,
          })),
        },
      };
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

/**
 * 비동기로 사진 가져오기
 */
export const asyncPhoto = selectorFamily<
  IRes<
    {
      relations: RelationType[];
    } & IContPhoto,
    false
  >,
  number
>({
  key: 'asyncPhoto',
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
