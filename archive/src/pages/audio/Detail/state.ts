import { IRes } from 'archive-types';
import * as api from 'api/audio';
import { IContAudio, RelationType } from '@types';
import { selectorFamily } from 'recoil';
import { getRelations } from 'api/content';

/**
 * 오디오 상세 데이터 조회
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
