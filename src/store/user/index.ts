import { observable, computed, action, makeObservable, autorun } from "mobx";
import { listen } from "@utils/observerListen";
import { Toast } from "antd-mobile";
class UserState {
  constructor() {
    makeObservable(this);
    autorun(() => {
      const userStr = sessionStorage.getItem("user");
      if (userStr) {
        this.updateUser(JSON.parse(userStr));
      }
      listen.addEventListener(-1, this.remoteLogin);
      listen.addEventListener(-2, this.logout);
    });
  }

  // 下载连接显示
  @observable showDownLoadLink = true;
  @action setShowDownLoadLink = (param: boolean) => {
    this.showDownLoadLink = param;
  };
  @observable isIosLink = false;
  @action setIsIosLink = (param: boolean) => {
    this.isIosLink = param;
  };

  @observable pullRed = {
    recommendMatchNum: 0,
    redListHits: 0,
  };

  @observable user: UserData = {
    isLogin: false,
    uid: "",
    sid: "",
    account: "",
    avatar: "",
    imgUrl: "",
    ws: "",
  };

  @action logout = () => {
    Toast.info("账号已退出");
    this.user.isLogin = false;
    sessionStorage.clear();
  };

  //登录成功后更新用户
  @action updateUser = (user: UserData) => {
    this.user = user;
    sessionStorage.setItem("user", JSON.stringify(user));
  };
  // 异地登录
  @action remoteLogin = (params: any) => {
    console.log(params, "您的账号异地登录");
    Toast.info("您的账号异地登录");
    this.user.isLogin = false;
    sessionStorage.clear();
  };
}
export default UserState;
