import React, { ChangeEvent, useState } from "react";
import Emoji from "./emoji";
type InputerProps = {
  sendMsg: Function;
  friendUid?: number | undefined;
};
const Inputer = (props: InputerProps) => {
  const { sendMsg, friendUid } = props;
  let [text, setText] = useState("");
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const send = () => {
    if (!text) return;
    sendMsg(text, friendUid);
    setText("");
  };

  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const displayEmojiFn = () => {
    setDisplayEmoji(!displayEmoji);
  };

  const selectEmoji = (emojiCode: string) => {
    setText((text += ":emoji[" + emojiCode + "]"));
  };

  return (
    <>
      <form className="inputer">
        {displayEmoji && <Emoji selectEmoji={selectEmoji} />}
        <textarea
          placeholder="消息"
          value={text}
          onChange={(e) => {
            changeText(e);
          }}
        />
        <span className="emoji" onClick={displayEmojiFn}></span>
        <button
          type="submit"
          className={`${text ? "send" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            send();
            setDisplayEmoji(false);
          }}
        >
          发送
        </button>
      </form>

      {/* <ul className="other-funs">
    <li className="emoji"></li>
    <li className="file"></li>
    <li></li>
   </ul> */}
    </>
  );
};

export default Inputer;
