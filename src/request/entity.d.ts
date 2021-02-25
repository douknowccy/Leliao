import { AxiosRequestConfig, AxiosResponse } from 'axios'
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
export interface Reuqest {
 url: string | undefined,
 headers?: any;
}
export interface Response extends AxiosResponse {
 msg?: string,
 code?: number
}
export interface Params {
 [rodom: string]: any
}
export interface Data {
 [rodom: string]: any
}