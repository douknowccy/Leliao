declare interface RegisterStore {
 phoneNumber: string | string,
 step: number,
 changePhoneNum: (num: string) => void,
 changeStep: (num: number) => void,
 register: () => Promise<any>
}