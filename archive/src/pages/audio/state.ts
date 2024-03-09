import { IRes } from 'http';

import * as api from 'api/audio';
import { IContAudio, RelationType } from 'dto';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { getRelations } from 'api/content';
import { IContAudioParams } from 'params';

export const audioListParams = atom<IContAudioParams>({
  key: 'audioListParams',
  default: {
    size: 20,
    page: 1,
  },
});

export const audioListState = atom<IContAudio[]>({
  key: 'audioListState',
  default: [],
});

/**
 * 비동기 오디오 목록
 */
export const audioListSelector = selector<IRes<IContAudio>>({
  key: 'audioListSelector',
  get: async ({ get }) => {
    const params = get(audioListParams);
    const response = await api.getAudios(params);
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

/**
 * 비동기 오디오 1개
 */
export const audioSelector = selectorFamily<
  IRes<
    IContAudio & {
      relations: RelationType[];
    },
    false
  >,
  number
>({
  key: 'audioSelector',
  get: (contId) => async () => {
    const response = await api.getAudio(contId);
    const relations = await getRelations({
      contType: 'A',
      contId,
    });

    let returnBody:
      | undefined
      | (IContAudio & {
          relations: RelationType[];
        }) = undefined;

    if (response.data.header.success) {
      returnBody = {
        ...response.data.body!,
        relations: relations.data.body?.list || [],
      };

      returnBody.filePath = `http://localhost:8080/stream/audio/${contId}`;
      returnBody.thumbFilePath = !returnBody.thumbFilePath?.startsWith('http')
        ? `http://localhost:8080${returnBody.thumbFilePath}`
        : returnBody.thumbFilePath;
    }

    return {
      header: response.data.header,
      body: returnBody,
    };
  },
});
