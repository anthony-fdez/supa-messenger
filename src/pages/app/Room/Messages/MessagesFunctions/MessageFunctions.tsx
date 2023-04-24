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
      <ActionIcon>
        <CornerUpLeft
          size={14}
          onClick={handleReply}
        />
      </ActionIcon>
      <ActionIcon>
        <Edit
          size={14}
          onClick={handleEdit}
        />
      </ActionIcon>
    </Flex>
  );
};

export default MessageFunctions;
