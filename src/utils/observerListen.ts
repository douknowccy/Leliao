import MyWs from "./websocket";
export class ObserverListen {
  constructor() {}
  handlers: any = {};

  addEventListener(type: number, handler: Function) {
    if (!(type in this.handlers)) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  }

  dispatchEvent(type: number, parasm: any) {
    if (!(type in this.handlers)) {
      return new Error("未注册该事件");
    }
    this.handlers[type].forEach((handler: Function) => {
      handler(parasm);
    });
  }

  removeEventListener(type: number, handler: Function) {
    if (!(type in this.handlers)) {
      return new Error("无效事件");
    }
    if (!handler) {
      delete this.handlers[type];
    } else {
      const idx = this.handlers[type].findIndex((ele: any) => ele === handler);
      if (idx === -1) {
        return new Error("无该绑定事件");
      }
      this.handlers[type].splice(idx, 1);
      if (this.handlers[type].length === 0) {
        delete this.handlers[type];
      }
    }
  }
}
export let listen: ObserverListen = null as any;
export let ws: any = null as any;
export const addListenr = () => {
  const userStr = sessionStorage.getItem("user");
  if (!listen) {
    listen = new ObserverListen();
  }
  if (ws) {
    ws.loginWs();
    ws.webSocketPing();
    return;
  }

  if (userStr) {
    let user = JSON.parse(userStr);
    ws = new MyWs(`wss://${user.ws}/ws`);
    // ws = new MyWs(`wss://172.21.174.75:9001/ws`);
    ws.message(listen);
    ws.onopen = () => {
      "open ws";
    };
    ws.loginWs();
    ws.webSocketPing();
  }
};
export default addListenr();
