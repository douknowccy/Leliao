import React, { useEffect, useState } from "react";
import { Toast } from "antd-mobile";
import { checkcode } from "../request";
import { observer, inject } from "mobx-react";
import "../style.scss";
const RegTwo = (props: any) => {
  let { registerState } = props;
  let { phoneNumber, register, changeStep } = registerState as RegisterStore;
  const [timing, setTiming] = useState(true);
  const [second, setSecond] = useState(60);
  const [code, setCode] = useState("");
  useEffect(() => {
    let interval: any;
    if (timing) {
      interval = setInterval(() => {
        setSecond((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            return 60;
          } else {
            return preSecond - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);
  useEffect(() => {
    if (code.length === 4) {
      viliCode();
    }
  }, [code]);
  const viliCode = () => {
    Toast.loading("Loading...");
    checkcode({ code })
      .then((res: any) => {
        changeStep(3);
        Toast.success("验证通过");
      })
      .catch((e) => {
        Toast.fail(e.message || "验证码错误");
        setCode("");
      });
  };

  const reSentViliCode = () => {
    register().then((res) => {
      Toast.success("成功发送");
    });
    setTiming(true);
  };

  return (
    <div className="main reg-two">
      <p className="reg-title">验证码</p>
      <p className="reg-remark">已发送验证码至：{phoneNumber}</p>
      {/* <p className="reg-remark">
    <span>验证码已通过短信发送至 +86{phoneNumber}</span>
   </p> */}
      <p className="reg-mobile">
        <span className={`in-num ${code[0] ? "check" : ""}`}>{code[0]}</span>
        <span className={`in-num ${code[1] ? "check" : ""}`}>{code[1]}</span>
        <span className={`in-num ${code[2] ? "check" : ""}`}>{code[2]}</span>
        <span className={`in-num ${code[3] ? "check" : ""}`}>{code[3]}</span>
        <input
          type="number"
          pattern="\d*"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </p>

      <span className="reset" onClick={() => reSentViliCode()}>{`重新发送${
        timing ? second : ""
      }`}</span>
    </div>
  );
};
export default inject("registerState")(observer(RegTwo));
