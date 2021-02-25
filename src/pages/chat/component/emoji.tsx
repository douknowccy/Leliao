import React, { useState } from "react";
import { emojiList } from "../entity";
const Emoji = (props: any) => {
  const { selectEmoji } = props;
  return (
    <nav className="emojis" onBlur={() => {}}>
      {emojiList.map((item) => {
        return (
          <i
            className={`emoji-icon emoji-${item.code}`}
            key={item.code}
            onClick={() => selectEmoji(item.code)}
          ></i>
        );
      })}
    </nav>
  );
};
export default Emoji;
