import { IRes } from 'http';

import * as api from 'api/audio';
import { IContAudio, RelationType } from 'dto';
import { selector, selectorFamily } from 'recoil';
import { getRelations } from 'api/content';

/**
 * 비동기 오디오 목록
 */
export const asyncAudioList = selector<IRes<IContAudio>>({
  key: 'asyncAudioList',
  get: async () => {
    const response = await api.getAudios();

    if (response.status === 200 && response.data.header.success) {
      return {
        header: response.data.header,
        body: {
          count: response.data.body!.count,
          keywords: response.data.body!.keywords,
          list: response.data.body!.list.map((item) => ({
            ...item,
            thumbFilePath: !item.thumbFilePath?.startsWith('http')
              ? `http://localhost:8080${item.thumbFilePath}`
              : item.thumbFilePath,
          })),
        },
      };
    }

    throw true;
  },
});

/**
 * 비동기 오디오 1개
 */
export const asyncAudio = selectorFamily<
  IRes<
    IContAudio & {
      relations: RelationType[];
    },
    false
  >,
  number
>({
  key: 'asyncAudio',
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
