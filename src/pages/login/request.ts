import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

export const login = (data: Data) => {
 return post('/api/user/login/byPwd', data)
}