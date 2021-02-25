import { Data, Params } from "src/request/entity.d";
import { get, post } from "src/request/api";

export const getInfo = (uid: number) => {
  return get("/api/user/personal", { uid });
};
export const changePwd = (data: any) => {
  return post("/api/user/changePass", data);
};
export const changeName = (data: any) => {
  return post("/api/user/changeName", data);
};
export const changeAvatar = (uid: number) => {
  return get("/api/user/changeAvatar", { uid });
};