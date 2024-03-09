import { IContPhoto } from 'dto';
import { IContPhotoParams } from 'params';

import client from './client';

/**
 * 사진 목록
 * @returns axios
 */
export const getPhotos = (params: IContPhotoParams) => {
  return client.get<IContPhoto>('/api/photos', {
    params,
  });
};

/**
 * 사진 상세
 * @param contId 컨텐츠ID
 * @returns axios
 */
export const getPhoto = (contId: number) => {
  return client.get<IContPhoto, IContPhoto, false>(`/api/photos/${contId}`);
};
