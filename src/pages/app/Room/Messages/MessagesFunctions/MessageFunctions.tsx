import React from "react";
import { CornerUpLeft, Edit } from "react-feather";

import { Flex } from "@mantine/core";
import useMessageStyles from "../useMessageStyles";

interface IMessageFunctions {
  handleEdit: () => void;
}
const MessageFunctions = ({ handleEdit }: IMessageFunctions): JSX.Element => {
  const { classes } = useMessageStyles();
  const handleReply = () => {
    console.log("reply");
  };

  return (
    <Flex
      gap={10}
      style={{ marginRight: "10px" }}
    >
      <CornerUpLeft
        size={20}
        className={classes.icons}
        onClick={handleReply}
      />
      <Edit
        size={20}
        className={classes.icons}
        onClick={handleEdit}
      />
    </Flex>
  );
};

export default MessageFunctions;
