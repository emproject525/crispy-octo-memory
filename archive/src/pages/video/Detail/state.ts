import { IRes } from 'archive-types';
import * as api from 'api/video';
import { IContVideo, RelationType } from '@types';
import { selectorFamily } from 'recoil';
import { getRelations } from 'api/content';

/**
 * 영상 상세 데이터 조회
 */
export const videoSelector = selectorFamily<
  IRes<
    IContVideo & {
      relations: RelationType[];
    },
    false
  >,
  number
>({
  key: 'videoSelector',
  get: (contId) => async () => {
    const response = await api.getVideo(contId);
    const relations = await getRelations({
      contType: 'V',
      contId,
    });

    let returnBody:
      | undefined
      | (IContVideo & {
          relations: RelationType[];
        }) = undefined;

    if (response.data.header.success) {
      returnBody = {
        ...response.data.body!,
        relations: relations.data.body?.list || [],
      };

      const mediaType = returnBody.mediaType;
      const path = returnBody.filePath;

      if (mediaType === '00') {
        // 자체 영상
        returnBody.filePath = `http://localhost:8080/videos/${contId}`;
        returnBody.thumbFilePath = returnBody.thumbFilePath
          ? `http://localhost:8080${returnBody.thumbFilePath}`
          : returnBody.thumbFilePath;
      } else if (path && mediaType === '01') {
        // 유튜브
        returnBody.filePath = `https://www.youtube.com/embed${(
          returnBody.filePath || ''
        ).replace(/(.*)(\/.*)/, '$2')}`;
      }
    }

    return {
      header: response.data.header,
      body: returnBody,
    };
  },
});
