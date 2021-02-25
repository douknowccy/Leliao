import { observable, computed, action, makeObservable, autorun } from "mobx";
import { getFriends, getMessagesHistory, friendsAdded } from "./request";
import { chatDateTimeFormate } from "@utils/dataTime";
import { listen } from "@utils/observerListen";
import { getUser } from "@utils/storage";
class FriendsState {
  constructor() {
    makeObservable(this);
    autorun(() => {
      // （-2: 登录异常, -1: 异地登录, 0: 心跳，1: 好友消息，2: 群消息，3: 好友请求消息，4: 好友同意消息，5: 加入群消息）
      listen?.addEventListener(1, this.update);
      // 加好友消息
      listen?.addEventListener(3, this.reqAddedFriends);
      //
      listen?.addEventListener(4, this.getFriendList);
    });
  }

  @observable isLastPage = false;
  @observable init = false;
  @observable currentChat = { id: 0 };
  @observable friendsData: any = [];
  @observable friendsAddedData: any = [];
  // 聊天记录
  @observable messagesHistory: any[] = [];
  //更新用户
  @action updateFriends = (friendsData: FriendsData) => {
    this.friendsData = friendsData;
  };

  // 加我好友的用户名单
  @action updateFriendsAdded = (friendsData: FriendsData) => {
    this.friendsAddedData = friendsData;
  };

  // 朋友名单
  @action getFriendList = () => {
    getFriends().then((res) => {
      this.friendsData = res.data;
      this.init = true;
    });
  };

  // 请求加我好友用户名单
  @action getUpdateFriendsAddedList = () => {
    friendsAdded().then((res) => {
      this.friendsAddedData = res.data;
    });
  };

  @action clearFriendHisotry = () => {
    this.messagesHistory = [];
  };

  // 请求聊天历史
  @action getMessageHistory = (id: number, page: number) => {
    getMessagesHistory({ senderUid: id, page }).then((res: any) => {
      let latest: [] = res.data;
      let dataIndex;
      this.isLastPage = res.finalPage;
      if (this.messagesHistory.length > 0) {
        let shift = this.messagesHistory[0];
        latest.map((item: any, index: number) => {
          if (item.msgId === shift.msgId) dataIndex = index;
        });
      }
      if (dataIndex != undefined) {
        latest = latest.slice(0, dataIndex) as [];
      }
      this.messagesHistory = [...this.messagesHistory, ...latest];
    });
  };

  // 跟谁的聊天记录
  @action setCurrentChat = (friendId: number) => {
    this.currentChat.id = friendId;
  };
  @action update = (data: any) => {
    const userStorage = getUser();
    const { createTime, message, user, type } = data;

    if (user.uid === userStorage.uid) return;
    const latest = {
      createTime,
      msgId: message.receiveId,
      msgContent: message.msgContent,
      msgType: type,
      senderUid: user.uid,
      user,
      modifiedTime: chatDateTimeFormate(createTime),
      dataTime: createTime,
    };
    // 若在聊天室窗内则更新
    if (this.currentChat.id === user.uid) this.messagesHistory.unshift(latest);
  };
  // socket 收到好友邀请
  @action reqAddedFriends = (data: any) => {
    const { createTime, message, user } = data;
    let latest = {
      createTime,
      user,
      uid: message.receiveId,
      remark: null,
      status: 0,
      friendUid: user.uid,
      id: message.ext,
    };

    this.friendsAddedData.push(latest);
  };

  @action myselfMsg = (msgData: any) => {
    const userStorage = getUser();
    const latest = {
      createTime: new Date(),
      msgId: msgData.receiveId,
      msgContent: msgData.msgContent,
      msgType: msgData.type,
      senderUid: userStorage.uid,
      user: {
        ...userStorage,
      },
    };
    this.messagesHistory.unshift(latest);
  };
}
export default FriendsState;
