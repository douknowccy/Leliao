import React, { useState, useEffect } from "react";
import Header from "@components/header";
import { observer, inject } from "mobx-react";
import { uploadImg, add } from "../request";
import choosen from "../assets/choosen.png";
import camera from "../assets/camera.png";
import "./CreateGroup.scss";
import { Toast } from "antd-mobile";
import defaultAvatar from "@pages/my/assets/avatar.png";
type CreateGroupProps = {
  display: boolean;
  setDisplay: Function;
  friendsState?: any;
  refreshData: Function;
};
function CreateGroup(props: CreateGroupProps | any) {
  const { display, setDisplay, friendsState, userState, refreshData } = props;
  const { friendsData, init, getFriendList } = friendsState;
  const { user } = userState;
  const [isInput, setIsInput] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    avatar: "",
    name: "",
  });

  const [isChoose, setisChoose] = useState<any>({});
  const [count, setCount] = useState(0);

  const chooseFriends = (id: number) => {
    let obj = isChoose;
    if (isChoose[id]) {
      delete obj[id];
      setisChoose({ ...obj });
    } else setisChoose({ ...isChoose, [id]: id });
  };
  useEffect(() => {
    setCount(Object.keys(isChoose).length);
  }, [isChoose]);
  useEffect(() => {
    //  若登入没有去朋友reset过 从这reset
    if (init) return;
    //  朋友名单
    getFriendList();
  }, []);
  const onChange = (e: any) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    let data = new FormData();
    data.append("file", file, file.name);
    Toast.loading("正在上传中...", 0);
    uploadImg(data).then((res) => {
      const { data } = res.data;
      setGroupInfo({ ...groupInfo, avatar: data.url });
      Toast.success("上传成功");
    });
  };
  const changeName = (e: any) => {
    setGroupInfo({ ...groupInfo, name: e.target.value });
  };
  const addGroup = () => {
    if (!groupInfo.avatar) {
      Toast.fail("请上传群图标!");
      return;
    }
    if (!groupInfo.name) {
      Toast.fail("请输入群组名称!");
      return;
    }
    const ids = Object.keys(isChoose);
    add({
      avatar: groupInfo.avatar,
      name: groupInfo.name,
      ids: ids.join(","),
    }).then((res) => {
      Toast.success("创建成功");
      refreshData();
      setDisplay(false);
      // 清空
      setGroupInfo({
        avatar: "",
        name: "",
      });
      setisChoose({});
    });
  };
  return (
    <div
      className={
        display ? "create_group_container addGroup" : "create_group_container"
      }
    >
      <Header title="创建群组" goback={() => setDisplay(false)} />
      {/* 创建群组 */}
      <div className="create_newgroup">
        <div className="avatar avatar_create">
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            multiple={false}
            onChange={(e) => onChange(e)}
          />
          {groupInfo.avatar ? (
            <>
              <img
                src={user.imgUrl + groupInfo.avatar}
                alt="camera"
                className="camera"
              />
            </>
          ) : (
            <>
              <img src={camera} alt="camera" className="camera" />
              <p className="camera_name"> 更换 </p>
            </>
          )}
        </div>
        {!isInput && (
          <div className="create_content" onClick={() => setIsInput(true)}>
            群名14个字以内
          </div>
        )}
        {isInput && (
          <input
            autoFocus
            className="create_input"
            value={groupInfo.name}
            onChange={changeName}
          ></input>
        )}
        {<button onClick={addGroup}>创建</button>}
      </div>
      {/* 朋友名单 */}
      <div className="newgroups_container">
        {friendsData.map((item: any) => {
          return (
            <div
              className="single_newgroup"
              key={item.friendUid}
              onClick={() => chooseFriends(item.friendUid)}
            >
              <div
                className={`${
                  isChoose[item.friendUid] ? "friendsChoosen" : "option"
                }`}
              >
                {isChoose[item.friendUid] && (
                  <img src={choosen} alt="choosen" />
                )}
              </div>
              <div className="avatar">
                <img
                  src={item.user.avatar}
                  alt=""
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
              </div>
              <div className="single_newgroup_content">
                <p className="newgroup_name">{item.user.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default inject("friendsState", "userState")(observer(CreateGroup));
