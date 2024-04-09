import { IArchiveAxiosInstance } from '@types';
import { IRes, ContType } from 'archive-types';

import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const base = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  timeout: 1000 * 60 * 5,
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

/**
 * Create Axios instance
 */
const client: IArchiveAxiosInstance = Object.assign({}, base, {
  async download(
    contents: { contId: number; contType: ContType },
    config: undefined | AxiosRequestConfig,
  ) {
    return base
      .post<BlobPart | IRes<boolean, false>>(`/download`, contents, {
        ...config,
        responseType: 'blob',
      })
      .then((response) => {
        const success = response.headers['ongoing'] === 'Y';

        if (success) {
          const disposition = response.headers['content-disposition'];
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          const filename = (matches?.[1] || '').replace(/['"]/g, '');
          const blob = new Blob([response.data as BlobPart]);

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        }

        return {
          success,
          response,
        };
      });
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
