import { Data, Params } from 'src/request/entity.d';
import { get, post } from "src/request/api"

// 用户最后信息
export const userList = () => {
 return get('/api/user/friend/lists', {})
}
// 群最后信息
export const groupList = () => {
 return get('/api/group/user/lists', {})
}

// 清空群信息-某个群
export const clearMsgByGroup = (data: Data) => {
 return post("/api/group/user/clearUnMsgCount", data)
}

// 清空朋友信息-某个人
export const clearMsgByFriend = (data: Data) => {
 return post("/api/user/friendMsg/clearUnMsgCount", data)
}