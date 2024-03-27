import { IRes, IContVideoParams } from 'archive-types';
import * as api from 'api/video';
import { IContVideo, RelationType } from '@types';
import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { getRelations } from 'api/content';

export const videoListParams = atom<IContVideoParams>({
  key: 'videoListParams',
  default: {
    size: 20,
    page: 1,
  },
});

export const videoListState = atom<IContVideo[]>({
  key: 'videoListState',
  default: [],
});

/**
 * 비동기 영상 목록
 */
export const videoListSelector = selector<IRes<IContVideo>>({
  key: 'videoListSelector',
  get: async ({ get }) => {
    const params = get(videoListParams);
    const response = await api.getVideos(params);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (response.status === 200 && response.data.header.success) {
      return response.data;
    }

    throw true;
  },
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
    } else if (newValue.header.success) {
      const before = get(videoListState);
      const params = get(videoListParams);
      const newList = newValue.body!.list.map((item) => ({
        ...item,
        thumbFilePath: !item.thumbFilePath?.startsWith('http')
          ? `http://localhost:8080${item.thumbFilePath}`
          : item.thumbFilePath,
      }));
      set(
        videoListState,
        params.page === 1 ? newList : [...before, ...newList],
      );
    }
  },
});

/**
 * 비동기 영상 1개
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
