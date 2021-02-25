import React from "react";
import "./style.scss";
import guidImg from "./assets/guid.png";
import { Link } from "react-router-dom";
function iosDownLoad() {
  return (
    <div className="iosdownload_bg">
      <img src={guidImg} alt="guidImg" />
      <Link to="/">我知道了</Link>
    </div>
  );
}

export default iosDownLoad;
