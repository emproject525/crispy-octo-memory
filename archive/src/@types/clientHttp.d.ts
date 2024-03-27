/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ContType, IRes } from 'archive-types';

/**
 * Override Axios instance
 */
export interface IArchiveAxiosInstance extends AxiosInstance {
  // interceptor
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse> & {
      use(
        onFulfilled?:
          | ((
              value: AxiosResponse,
            ) => IRes | AxiosResponse | Promise<IRes | AxiosResponse>)
          | null,
        onRejected?: ((error: any) => any) | null,
        options?: AxiosInterceptorOptions,
      ): number;
    };
  };
  get<
    T = any,
    D = any,
    isListBody = true,
    R = AxiosResponse<IRes<T, isListBody>, IRes<T, isListBody>>,
  >(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  download<
    D = {
      contType: ContType;
      contId: number;
    },
  >(
    D,
    config?: AxiosRequestConfig,
  ): Promise<{
    success: boolean;
    response: AxiosResponse<BlobPart | IRes<boolean, false>>;
  }>;
}
