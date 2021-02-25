import Chat from "@pages/chat";
import Login from "@pages/login";
import Register from "@pages/register";
import Messages from "@pages/messages";
import Friends from "@pages/friends";
import Groups from "@pages/groups";
import My from "@pages/my";
import iosDownLoad from "@pages/iosDownload";
const routeMap = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: Login,
    auth: false,
  },
  // 注册
  {
    path: "/r",
    name: "register",
    component: Register,
    auth: false,
  },
  // 注册
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    auth: true,
  },
  {
    path: "/",
    name: "messages",
    component: Messages,
    auth: true,
  },
  {
    path: "/friends",
    name: "friends",
    component: Friends,
    auth: true,
  },
  {
    path: "/groups",
    name: "groups",
    component: Groups,
    auth: true,
  },
  {
    path: "/my",
    name: "my",
    component: My,
    auth: true,
  },
  {
    path: "/iosdownload",
    name: "iosdownload",
    component: iosDownLoad,
    auth: false,
  },
];
export default routeMap;
