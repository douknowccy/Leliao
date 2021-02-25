import axios from "axios"
import api from "./request"

import { Params, Data } from "./entity"
export const get = (url: string, params: Params) => {
 return api({
  url,
  method: 'get',
  params,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
 })
}

export const post = (url: string, data: Data) => {
 return api({
  url,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
 })
}

export const upload = (url: string, data: Data) => {
 const baseURL: string = process.env.NODE_ENV === 'production' ? 'api/' : '';
 return axios.post(baseURL + url, data, {
  headers: { 'Content-Type': 'multipart/form-data' },
 })
}