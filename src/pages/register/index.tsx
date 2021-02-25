import React from "react";
import { useHistory } from "react-router-dom";
import HeaderBar from "@components/header";
import RegOne from "./component/regOne";
import RegTwo from "./component/regTwo";
import RegThree from "./component/regThree";
import { observer, inject } from "mobx-react";
import "./style.scss";
const Register = (props: any) => {
  let { registerState } = props;
  let { step, changePhoneNum, changeStep } = registerState as RegisterStore;
  const { replace } = useHistory();

  // 注册跳转
  const back = () => {
    if (step === 1) {
      changePhoneNum("");
      replace("/login");
      return;
    }
    if (step === 2) {
      changePhoneNum("");
      changeStep(1);
      return;
    }
    if (step === 3) {
      changePhoneNum("");
      changeStep(2);
      return;
    }
  };

  return (
    <div className="register">
      <HeaderBar goback={back} title={"注册"} service={""} />
      {step === 1 && <RegOne />}
      {step === 2 && <RegTwo />}
      {step === 3 && <RegThree />}
    </div>
  );
};
export default inject("registerState")(observer(Register));
