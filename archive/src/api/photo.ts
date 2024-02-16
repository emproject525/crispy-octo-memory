import { IContPhoto } from 'dto';

import client from './client';

/**
 * API
 * @returns
 */
export const getPhotos = () => {
  return client.get<IContPhoto>('/photos');
};
