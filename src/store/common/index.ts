import { observable, action, makeObservable} from "mobx";

class CommonState {
  constructor() {
    makeObservable(this)
  }
  @observable clientHeight = document.documentElement.clientHeight;
  @observable footerHeight = 60;

  @action updateFooterHeight = (num: number) => {
    this.footerHeight = num;
  }
}
export default CommonState;