import { IArchiveAxiosInstance } from 'http';

import axios from 'axios';
import qs from 'qs';

/**
 * Create Axios instance
 */
const client: IArchiveAxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: false,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      allowDots: true,
      indices: true,
      skipNulls: true,
      arrayFormat: 'repeat',
      filter: (prefix, value) =>
        typeof value === 'string' && value === '' ? undefined : value,
    }),
  formSerializer: {
    dots: true,
    indexes: true,
  },
});

export const abortClient = new AbortController();

function onabort() {
  console.log('Api is aborted');
  const newController = new AbortController();
  newController.signal.onabort = onabort;
  Object.assign(abortClient, newController);
  client.defaults.signal = newController.signal;
}

abortClient.signal.onabort = onabort;
client.defaults.signal = abortClient.signal;

export default client;
