import { IRes } from 'archive-types';

import * as api from 'api/text';
import { IContText, RelationType } from '@types';
import { selectorFamily } from 'recoil';
import { getRelations } from 'api/content';

/**
 * 문서 상세 데이터 조회
 */
export const textOneState = selectorFamily<
  IRes<
    IContText & {
      relations: RelationType[];
    },
    false
  >,
  number
>({
  key: 'textOneState',
  get: (contId) => async () => {
    const response = await api.getText(contId);
    const relations = await getRelations({
      contType: 'T',
      contId,
    });

    let returnBody:
      | undefined
      | (IContText & {
          relations: RelationType[];
        }) = undefined;

    if (response.data.header.success) {
      returnBody = {
        ...response.data.body!,
        relations: relations.data.body?.list || [],
      };
    }

    return {
      header: response.data.header,
      body: returnBody,
    };
  },
});
