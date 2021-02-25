import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const query = (params: Params) => {
 return get('/api/data/menu-list', params)
}
export const sendSms = (data: Data) => {
 return post('/api/user/login/sendSms', data)
}
export const checkcode = (data: Data) => {
 return post('/api/user/login/checkCode', data)
}
export const save = (data: Data) => {
 return post('/api/user/login/register', data)
}