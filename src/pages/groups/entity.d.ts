namespace GroupInterface {
 declare interface Group {
  group: GroupInfo
  groupId: number
  id: number
  lastAckMsgId: number
  lastMsgContent: string
  lastMsgTime: string
  rank: number
  remark: string
  uid: number
  unMsgCount: number
 }
 declare interface GroupInfo {
  avatar: string
  createTime: string
  groupId: number
  memberNum: number
  modifiedTime: string
  name: "工作群"
  remark: string
  uid: number
 }
}