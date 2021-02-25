import CommonState from "./common";
import MsgState from "./message";
import UserState from "./user";
import FriendsState from "../pages/friends/store";
import GroupsState from "../pages/groups/store";
import RegisterState from "@pages/register/store";
const friendsState = new FriendsState();
const commonState = new CommonState();
const userState = new UserState();
const registerState = new RegisterState();
const msgState = new MsgState();
const groupsState = new GroupsState();
const store = {
  commonState,
  registerState,
  userState,
  msgState,
  groupsState,
  friendsState,
};

export default store;
