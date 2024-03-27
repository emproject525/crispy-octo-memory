import { IRes } from 'archive-types';

import * as api from 'api/photo';
import { getRelations } from 'api/content';
import { IContPhoto, RelationType } from '@types';
import { selectorFamily } from 'recoil';

/**
 * 사진 상세 데이터 조회
 */
export const photoOneState = selectorFamily<
  IRes<
    {
      relations: RelationType[];
    } & IContPhoto,
    false
  >,
  number
>({
  key: 'photoOneState',
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
