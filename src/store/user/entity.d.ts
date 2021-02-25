declare interface UserData {
  isLogin: boolean; //登录状态
  sid: string;
  uid: string;
  account: string;
  avatar: string;
  imgUrl: string;
  ws: string;
}

declare interface UserParams {
  data: {
    id: number; //唯一标识
    remark?: string; // 备注
    nickname?: string; // 昵称
  };
}

declare interface UserState {
  setShowDownLoadLink: (param: boolean) => void;
  showDownLoadLink: boolean;
  user: UserData;
  pullRed: {
    recommendMatchNum: number;
    redListHits: number;
  };
  logout: () => void;
  updateUser: (user: UserData) => void;
  setPullRed: (n1: number, n2: number) => void;
}
