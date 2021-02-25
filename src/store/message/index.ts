import { observable, action, makeObservable, autorun, computed } from "mobx";
import { listen } from "@utils/observerListen";
import { chatDateTimeFormate } from "@utils/dataTime";

import { groupList } from "@pages/messages/request";

class MessageState {
  constructor() {
    makeObservable(this);
    autorun(() => {
      // （-2: 登录异常, -1: 异地登录, 0: 心跳，1: 好友消息，2: 群消息，3: 好友请求消息，4: 好友同意消息，5: 加入群消息 6: 退群消息）

      listen?.addEventListener(1, this.update);
      listen?.addEventListener(2, this.updateGroup);
      listen?.addEventListener(5, this.newGroup);
      listen?.addEventListener(6, this.kickedByGroup);
    });
  }
  @observable isLastPage: boolean = false;
  @observable init: boolean = false;
  @observable currentChat = { groupId: 0, id: 0 };
  @observable msgHisotry: MessageStore.MsgHisotryKey = {};

  // 退群消息
  @action kickedByGroup = (res: any) => {
    const {
      user: { groupId },
    } = res;
    // 請求來的群 mobx上群的key
    let key = 2 + "-" + groupId;
    // 消息發來的時候mobx 群的key
    let keyAddGroupKey = 5 + "-" + groupId;
    let tempData = this.msgHisotry;
    delete tempData[key];
    delete tempData[keyAddGroupKey];
    this.msgHisotry = tempData;
  };

  //  进群通知
  @action newGroup = (response: any) => {
    const { message, type, user, createTime } = response;
    const data: MessageStore.MsgHisotry = {
      id: user.groupId,
      type: 2,
      name: user.groupName,
      remark: user.remark,
      avatar: user.avatar,
      groupAvatar: user.groupAvatar,
      lastMsgContent: message.msgContent,
      unMsgCount: 1,
      modifiedTime: chatDateTimeFormate(createTime),
      dataTime: createTime,
    };
    this.addHistoryItem(data);
  };

  // 朋友更新
  @action update = (response: any) => {
    const str = sessionStorage.getItem("user") || "";
    const loginUser = JSON.parse(str);
    const { message, type, user, createTime } = response;
    // debugger;
    if (!message.receiveId || !user.uid) return;
    const data: MessageStore.MsgHisotry = {
      id: loginUser.uid === user.uid ? message.receiveId : user.uid,
      type,
      name: user.name,
      remark: user.remark,
      avatar: user.avatar,
      lastMsgContent: message.msgContent,
      unMsgCount: 1,
      modifiedTime: createTime,
      dataTime: createTime,
    };

    // 如果已经在聊天界面
    if (this.currentChat.id === user.uid) {
      data.unMsgCount = 0;
      this.addHistoryItem(data);

      return;
    }
    this.addHistoryItem(data);
  };

  // 群更新
  updateGroup = (response: any) => {
    const { message, type, user, createTime } = response;

    const data: MessageStore.MsgHisotry = {
      id: message.receiveId,
      type,
      name: user.name,
      remark: user.remark,
      avatar: user.avatar,
      groupAvatar: user.groupAvatar,
      lastMsgContent: message.msgContent,
      unMsgCount: 1,
      modifiedTime: chatDateTimeFormate(createTime),
      dataTime: createTime,
    };
    if (this.currentChat.groupId === message.receiveId) {
      data.unMsgCount = 0;
      this.addHistoryItem(data);
      return;
    }
    this.addHistoryItem(data);
  };

  @action initMessags = () => {
    this.init = true;
  };

  @action setCurrentChatByMsgStore = (data: any) => {
    this.currentChat = data;
  };

  @computed get total() {
    let total = 0;
    Object.keys(this.msgHisotry).map((key) => {
      total = total + this.msgHisotry[key].unMsgCount;
    });
    return total;
  }

  addHistoryItem = (params: MessageStore.MsgHisotry) => {
    const {
      type,
      id,
      lastMsgContent,
      modifiedTime,
      unMsgCount,
      groupAvatar,
      dataTime,
    } = params;

    const { name, remark, avatar } = params;
    let key = type + "-" + id;
    let isLive = this.msgHisotry[key];
    // 存在则更新
    if (isLive) {
      if (this.currentChat.id || this.currentChat.groupId) {
        isLive.unMsgCount = isLive.unMsgCount = 0;
      } else {
        isLive.unMsgCount = isLive.unMsgCount + 1;
      }
      isLive.lastMsgContent = lastMsgContent;
      isLive.modifiedTime = chatDateTimeFormate(modifiedTime);
      return;
    }

    const data = {
      id,
      type,
      name,
      remark,
      avatar,
      groupAvatar,
      lastMsgContent,
      modifiedTime: chatDateTimeFormate(modifiedTime),
      unMsgCount,
      dataTime: dataTime,
    };
    this.msgHisotry[key] = data;
  };
}
export default MessageState;
