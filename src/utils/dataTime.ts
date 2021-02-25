import dayjs from "dayjs";
export const mmddhhmmss_zh = (date: string) => {
  return dayjs(date).format("MM月DD日 HH:mm");
};

export const mmddhhmmss = (date: string) => {
  return dayjs(date).format("MM-DD HH:mm");
};

export const yyyymmddhhmmss2 = (date: string) => {
  if (date) {
    return dayjs(date).format("MM/DD HH:mm");
  }
  return "";
};
export const chatDateTimeFormate = (date: string) => {
  return mmddhhmmss_zh(date);
};
