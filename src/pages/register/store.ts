import { observable, action, makeObservable } from "mobx";
import { sendSms } from "./request"
class RegisterState {
 constructor() {
  makeObservable(this)
 }
 @observable phoneNumber = '';
 @observable step = 1;

 @action
 changeStep = (val: number) => {
  this.step = val;
 }

 @action
 changePhoneNum = (val: string) => {
  this.phoneNumber = val;
 }

 /**
  *发送短信
  */
 @action
 register = () => {
  return sendSms({ mobilePhone: this.phoneNumber  })
 }
}
export default RegisterState;