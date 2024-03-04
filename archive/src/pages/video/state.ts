import { IRes } from 'http';

import * as api from 'api/video';
import { IContVideo, RelationType } from 'dto';
import { selector, selectorFamily } from 'recoil';
import { getRelations } from 'api/content';

/**
 * 비동기 영상 목록
 */
export const asyncVideoList = selector<IRes<IContVideo>>({
  key: 'asyncVideoList',
  get: async () => {
    const response = await api.getVideos();

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
 * 비동기 영상 1개
 */
export const asyncVideo = selectorFamily<
  IRes<
    IContVideo & {
      relations: RelationType[];
    },
    false
  >,
  number
>({
  key: 'asyncVideo',
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
        returnBody.filePath = `http://localhost:8080/videos/${contId}`;
        returnBody.thumbFilePath = returnBody.thumbFilePath
          ? `http://localhost:8080${returnBody.thumbFilePath}`
          : returnBody.thumbFilePath;
      } else if (path && mediaType === '01') {
        returnBody.filePath = `https://www.youtube.com/embed${returnBody.filePath.replace(
          /(.*)(\/.*)/,
          '$2',
        )}`;
      }
    }

    return {
      header: response.data.header,
      body: returnBody,
    };
  },
});
