/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'http' {
  import {
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosInterceptorOptions,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
  import { ContType } from 'dto';

  /**
   * 서버 응답
   */
  export interface IRes<T = any, isListBody = true> {
    header: {
      success: boolean; // 로직의 성공 여부
      status: number;
      message: string; // i18n 메세지
      messageOptions?: Record<string, string>; // i18n 메세지옵션
    };
    body?: isListBody extends true
      ? {
          list: T[];
          count: number;
          keywords: string[];
        }
      : T;
  }

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
    ): Promise<{
      success: boolean;
      response: AxiosResponse<BlobPart | IRes<boolean, false>>;
    }>;
  }
}
