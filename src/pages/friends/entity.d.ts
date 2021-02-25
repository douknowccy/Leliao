declare interface FriendsState {
  friendsData: FriendsData;
  updateFriends: (friendsData: FriendsData) => void;
}
declare interface SingleMessage {
  friendUid: number;
  lastMsgContent: string;
  modifiedTime: string;
  remark: string;
  uid: number;
  unMsgCount: number;
}
type MessageData = SingleMessage;

declare interface userData {
  account: string;
  avatar: string;
  name: string;
  remark: string;
  uid: number;
}
declare interface FriendsData {
  [
    data: {
      status?: number;
      uid: number;
      friendUid: number;
      remark: string;
      unMsgCount: number;
      lastMsgContent: string;
      modifiedTime: string;
      user: userData;
    }
  ];
}
