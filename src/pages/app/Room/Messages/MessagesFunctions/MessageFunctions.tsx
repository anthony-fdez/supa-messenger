import React from "react";
import { CornerUpLeft, Edit } from "react-feather";

import { ActionIcon, Flex } from "@mantine/core";

interface IMessageFunctions {
  handleEdit: () => void;
}
const MessageFunctions = ({ handleEdit }: IMessageFunctions): JSX.Element => {
  const handleReply = () => {
    console.log("reply");
  };

  return (
    <Flex gap={5}>
      <ActionIcon onClick={handleReply}>
        <CornerUpLeft size={14} />
      </ActionIcon>
      <ActionIcon onClick={handleEdit}>
        <Edit size={14} />
      </ActionIcon>
    </Flex>
  );
};

export default MessageFunctions;
