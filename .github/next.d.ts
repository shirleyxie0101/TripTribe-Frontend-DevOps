import type { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export declare interface AxiosRequestConfig {
    controller?: AbortController;
    isAbortWhenUnmount?: boolean;
  }
}
