import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import downlogo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import cancel from "../../assets/img/cancel.png";
import "./style.scss";
function DownLoad(props: any) {
  const { userState } = props;
  let {
    showDownLoadLink,
    setShowDownLoadLink,
    isIosLink,
    setIsIosLink,
  } = userState;
  function isWebview() {
    var useragent = navigator.userAgent;
    var rules = ["wv", "WebView", "webview"];
    var regex = new RegExp(`(${rules.join("|")})`, "ig");
    return Boolean(useragent.match(regex));
  }
  function isIos() {
    var useragent = navigator.userAgent;
    var rules = ["Mac", "(iPhone|iPod|iPad)(?!.*Safari/)"];
    var regex = new RegExp(`(${rules.join("|")})`, "ig");
    return Boolean(useragent.match(regex));
  }
  useEffect(() => {
    if (isWebview()) {
      setShowDownLoadLink(false);
    }
    if (isIos()) setIsIosLink(true);
    if (!isIos()) setIsIosLink(false);
  }, []);
  console.log(navigator.userAgent);
  console.log(navigator.userAgent);
  return (
    <>
      {showDownLoadLink && (
        <div
          className="download_link"
          style={{ bottom: `${props.loginPage ? 0 : "8%"}` }}
        >
          <div className="content">
            <img src={downlogo} alt="logo" />
            <h4>
              聊天就来乐聊
              <p>随时随地,想聊就聊!</p>
            </h4>
          </div>

          {isIosLink ? (
            <Link
              to="/iosdownload"
              onClick={() => setShowDownLoadLink(false)}
            ></Link>
          ) : (
            <a
              href="/leliao.apk"
              download
              onClick={() => setShowDownLoadLink(false)}
            ></a>
          )}

          <img
            src={cancel}
            alt="cancel"
            onClick={() => setShowDownLoadLink(false)}
          />
        </div>
      )}
    </>
  );
}

export default inject("userState")(observer(DownLoad));
