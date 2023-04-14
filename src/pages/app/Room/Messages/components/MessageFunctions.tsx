import React from "react";
import { CornerUpLeft } from "react-feather";
import useGlobalStore from "../../../../../store/useGlobalStore";
import useMessageStyles from "../useMessageStyles";

const MessageFunctions = () => {
  const { classes } = useMessageStyles();
  const handleReply = () => {
    console.log("reply");
  };
  const { setReplyMessage, replyMessage } = useGlobalStore();
  return (
    <div>
      <div>
        <CornerUpLeft
          size={20}
          className={classes.replyIcon}
          onClick={handleReply}
        />
      </div>
    </div>
  );
};

export default MessageFunctions;
