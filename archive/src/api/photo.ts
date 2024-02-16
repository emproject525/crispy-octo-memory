import { IContPhoto } from 'dto';
import { IContPhotoParams } from 'params';

import client from './client';

/**
 * API
 * @returns
 */
export const getPhotos = (params: IContPhotoParams) => {
  return client.get<IContPhoto>('/photos');
};
