import { IRes } from 'http';

import * as api from 'api/text';
import { IContText, RelationType } from 'dto';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { getRelations } from 'api/content';
import { IContTextParams } from 'params';

export const textListParams = atom<IContTextParams>({
  key: 'textListParams',
  default: {
    size: 20,
    page: 1,
  },
});

export const textListState = atom<IContText[]>({
  key: 'textListState',
  default: [],
});

/**
 * 비동기 문서 목록
 */
export const textListSelector = selector<IRes<IContText>>({
  key: 'textListSelector',
  get: async ({ get }) => {
    const params = get(textListParams);
    const response = await api.getTexts(params);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (response.status === 200 && response.data.header.success) {
      return response.data;
    }

    throw true;
  },
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
    } else if (newValue.header.success) {
      const before = get(textListState);
      const params = get(textListParams);
      const newList = newValue.body!.list.map((item) => ({
        ...item,
      }));
      set(textListState, params.page === 1 ? newList : [...before, ...newList]);
    }
  },
});

/**
 * 비동기 문서 1개
 */
export const textSelector = selectorFamily<
  IRes<
    IContText & {
      relations: RelationType[];
    },
    false
  >,
  number
>({
  key: 'textSelector',
  get: (contId) => async () => {
    const response = await api.getText(contId);
    const relations = await getRelations({
      contType: 'V',
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
