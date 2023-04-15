import React from "react";
import { CornerUpLeft, Edit } from "react-feather";

import { Flex } from "@mantine/core";
import useGlobalStore from "../../../../../store/useGlobalStore";
import useMessageStyles from "../useMessageStyles";

const MessageFunctions = () => {
  const { classes } = useMessageStyles();
  const handleReply = () => {
    console.log("reply");
  };
  const handleEdit = () => {
    console.log("edit");
  };
  const { setReplyMessage, replyMessage } = useGlobalStore();
  return (
    <div>
      <Flex gap={10}>
        <CornerUpLeft
          size={20}
          className={classes.replyIcon}
          onClick={handleReply}
        />
        <Edit
          size={20}
          className={classes.replyIcon}
          onClick={handleEdit}
        />
      </Flex>
    </div>
  );
};

export default MessageFunctions;
