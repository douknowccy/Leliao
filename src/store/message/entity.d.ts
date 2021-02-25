namespace MessageStore {
  declare type MsgType = 1 | 2; // 1为好友  2为群

  declare interface MsgData {
    msgHisotry: MsgHisotryKey;
    unread: number;
    init: boolean;
    addHistoryItem: Function;
    initMessags: Function;
    setCurrentChatByMsgStore: Function;
    isLastPage: boolean
    msgs: {
      list: [];
      checkUser: number;
    };
  }
  declare type MsgHisotryKey = {
    [key: string]: MsgHisotry;
  };
  declare interface MsgHisotry {
    id: number;
    type: 1 | 2;
    name: string;
    remark: string;
    avatar: string;
    groupAvatar?: string;
    lastMsgContent: string;
    unMsgCount: number;
    modifiedTime: string;
    dataTime: string;
  }
  declare interface MsgsList {
    id: number;
    type: 1 | 2;
    name: string;
    remark: string;
    avatar: string;
    lastMsgContent: string;
    unMsgCount: number;
    modifiedTime: Date;
  }
}
