import { Data, Params, Response } from "src/request/entity.d";
import { get, post } from "src/request/api";

export const login = (data: Data) => {
  return post("/api/user/login/byPwd", data);
};

export const friendsAdded = () => {
  return get("/api/user/friendAsk/lists", {});
};

export const getFriends = () => {
  return get("/api/user/friend/lists", {});
};

export const searchFriendByAccount = (account: string) => {
  return post("/api/user/friend/search", { account, reqNo: "", timeStamp: 0 });
};

export const requestAddFriend = (friendUid: string) => {
  return post("/api/user/friendAsk/create", {
    friendUid,
    reqNo: "",
    timeStamp: 0,
  });
};

export const agreeOrDeclineFriend = (status: number, id: number) => {
  return post("/api/user/friendAsk/ack", {
    status,
    id,
    reqNo: "",
    timeStamp: 0,
  });
};
export const list = () => {
  return get("/api/user/friend/lists", {});
};

export const getMessagesHistory = (data: any) => {
  return get("/api/user/friendMsg/lists", data);
};
export const sendMessage = (data = {}) => {
  return post("/api/user/friendMsg/create", data);
};
