import { observable, computed, action, makeObservable, autorun } from "mobx";
import {
  lists,
  getGroupHisotrys,
  getGroupMembersByGroupId,
  deleteGroupMembers,
  addGroupMembers,
} from "./request";
import { listen } from "@utils/observerListen";
import { getUser } from "@utils/storage";
class GroupsState {
  constructor() {
    makeObservable(this);
    autorun(() => {
      // 2：群信息
      listen?.addEventListener(2, this.update);
    });
  }
  @observable isLastPage = false;
  @observable init = false;
  @observable currentChat = { groupId: 0 };
  @observable groupsData = [];
  @observable friendsAddedData: FriendsData = [];
  // 群成員
  @observable groupMembers: any = [];
  // 聊天记录
  @observable messagesHistory: any[] = [];

  // 群裡面的成員
  @action getGroupMembers = (groupId: number) => {
    getGroupMembersByGroupId(groupId).then((res) => {
      this.groupMembers = res.data;
    });
  };
  // @action setGroupMembers = (data: any) => {
  //   this.groupMembers = data;
  // };
  // 刪除群裡成員
  @action getDeleteGroupMembers = (ids: string, groupId: number) => {
    deleteGroupMembers(ids, groupId).then(() => {
      // 刪除完重新拿群組成員
      this.getGroupMembers(groupId);
    });
  };

  // 加人進群
  @action getAddGroupMembers = (ids: string, groupId: number) => {
    addGroupMembers(ids, groupId).then(() => {
      // 增加完重新拿群組成員
      this.getGroupMembers(groupId);
    });
  };
  //登录成功后更新用户
  @action updateFriends = (friendsData: FriendsData) => {
    // this.friendsData = friendsData;
  };

  @action updateFriendsAdded = (friendsData: FriendsData) => {
    this.friendsAddedData = friendsData;
  };

  @action getGroupList = () => {
    lists().then((res) => {
      this.groupsData = res.data;
      this.init = true;
    });
  };
  @action setCurrentChat = (groupId: number) => {
    this.currentChat.groupId = groupId;
  };
  @action clearGroupHisotry = () => {
    this.messagesHistory = [];
  };
  @action groupHisotrys = async (id: number, page: number) => {
    getGroupHisotrys({ groupId: id, page }).then((res: any) => {
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
  @action update = (data: any) => {
    const userStorage = getUser();
    const { createTime, message, user, type } = data;
    if (
      message.receiveId != this.currentChat.groupId ||
      user.uid === userStorage.uid
    )
      return;

    const latest = {
      createTime,
      groupId: message.receiveId,
      msgContent: message.msgContent,
      msgType: type,
      senderUid: user.uid,
      user,
    };
    this.messagesHistory.unshift(latest);
  };
  @action myselfMsg = (msgData: any) => {
    const userStorage = getUser();
    const latest = {
      createTime: new Date(),
      groupId: msgData.groupId,
      msgContent: msgData.msgContent,
      msgType: 2,
      senderUid: userStorage.uid,
      user: {
        ...userStorage,
      },
    };
    this.messagesHistory.unshift(latest);
  };
}
export default GroupsState;
