import Ws from "reconnecting-websocket";
import ReconnectingWebSocket from "reconnecting-websocket";
import protoRoot from "../proto/proto";
const WSBaseReqProto: any = protoRoot.lookup("protocol.WSBaseReqProto");
const WSBaseResProto: any = protoRoot.lookup("protocol.WSBaseResProto");

let webSocketPingTimer: any;
export default class MyWs {
  //@ts-ignore
  private ws: ReconnectingWebSocket = null;
  constructor(url: string) {
    if (this.ws == null) {
      this.connect(url);
    }
  }
  // 定时心跳
  webSocketPing() {
    webSocketPingTimer = setTimeout(() => {
      console.log("心跳");
      const userStr = sessionStorage.getItem("user");
      const user = JSON.parse(userStr || "");
      const payload = {
        sid: user.sid,
        uid: user.uid,
        type: 0,
      };
      this.send(payload);
      clearTimeout(webSocketPingTimer);
      // 重新执行

      this.webSocketPing();
    }, 2000);
  }

  connect = (url: string) => {
    this.ws = new Ws(url, "", { debug: false });
  };

  open = () => {
    this.ws.onopen = (event) => {
      this.loginWs();
      this.webSocketPing();
    };
  };

  close = () => {
    this.ws.addEventListener("close", () => {
      console.log("关闭连接");
      this.ws.reconnect();
    });
  };

  errorHandle = () => {
    this.ws.onerror = () => {
      console.log("连接发送错误");
      this.ws.reconnect();
    };
  };
  loginWs = () => {
    const userStr = sessionStorage.getItem("user");
    console.log("登录ws", userStr);
    if (!userStr) return;
    const user = JSON.parse(userStr || "");
    const payload = {
      sid: user.sid,
      uid: user.uid,
      type: 1,
    };
    this.send(payload);
  };
  send = (data: any) => {
    const wsData = WSBaseReqProto.create(data);
    let buffer = WSBaseReqProto.encode(wsData).finish();
    this.ws.send(buffer);
  };
  htmlSpecialChars(str: string) {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#039;");
    return str;
  }
  message = (obj: any) => {
    this.ws.onmessage = (event) => {
      const data = event.data;
      let reader = new FileReader();
      reader.readAsArrayBuffer(data);
      reader.onload = () => {
        const buf = new Uint8Array(reader.result as any);
        const response = WSBaseResProto.decode(buf);
        console.log(response);
        obj.dispatchEvent(response.type, response);
      };
    };
  };
}
