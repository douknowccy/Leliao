import { post, get, upload } from "src/request/api";

// 创建群组
export const sendGroupMsg = (data = {}) => {
  return post("/api/group/msg/create", data);
};
// 创建群组
export const add = (data = {}) => {
  return post("/api/group/create", data);
};
// 群用户列表
export const lists = (data = {}) => {
  return get("/api/group/user/lists", {});
};
// 群用户列表
export const usersByGroupd = (data = {}) => {
  return get("/api/group/lists", {});
};

// 上传图片
export const uploadImg = (data: any) => {
  return upload("/api/file/img/upload", data);
};

// 群消息-某群历史消息
export const getGroupHisotrys = (data: any) => {
  return get("/api/group/msg/lists", data);
};

export const getGroupMembersByGroupId = (groupId: number) => {
  return get("/api/group/lists", { groupId });
};

export const deleteGroupMembers = (uids: string, groupId: number) => {
  return post("/api/group/user/deleteByUid", { uids, groupId });
};
export const addGroupMembers = (uids: string, groupId: number) => {
  return post("/api/group/user/create", { uids, groupId });
};
