import React from "react";
import { useHistory } from "react-router-dom";
import useServiceHooks from "@hooks/useServiceHooks";
import "./style.scss";
export type HeaderBarProps = {
  goback?: string | (() => void);
  title: string;
  service?: string;
  rightIcon?: Function | null;
  search?: boolean;
};
const HeaderBar = (props: HeaderBarProps) => {
  let history = useHistory();
  let { onService } = useServiceHooks();
  const { goback, title, service, rightIcon, search } = props;
  const to = () => {
    if (typeof goback === "function") {
      goback();
    } else {
      if (goback) history.replace(goback);
    }
  };
  return (
    <header className="header-wrap">
      <ul className="container">
        {goback ? <li className="goback" onClick={to}></li> : <li></li>}
        <li className="title">{title}</li>
        {rightIcon ? rightIcon() : <li></li>}
      </ul>
    </header>
  );
};
export default HeaderBar;
