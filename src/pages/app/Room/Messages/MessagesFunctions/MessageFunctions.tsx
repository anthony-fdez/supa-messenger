import React from "react";
import { CornerUpLeft, Edit } from "react-feather";

import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import useGlobalStore, {
  IDatabaseMessages,
} from "../../../../../store/useGlobalStore";

interface IMessageFunctions {
  handleEdit: () => void;
  message: IDatabaseMessages;
}
const MessageFunctions = ({
  handleEdit,
  message,
}: IMessageFunctions): JSX.Element => {
  const {
    user: { uid },
  } = useGlobalStore();

  const handleReply = () => {
    console.log("reply");
  };

  return (
    <Flex gap={5}>
      <Tooltip
        withArrow
        withinPortal
        label="Reply"
      >
        <ActionIcon onClick={handleReply}>
          <CornerUpLeft size={14} />
        </ActionIcon>
      </Tooltip>

      {message.user_id === uid && (
        <Tooltip
          withArrow
          withinPortal
          label="Edit"
        >
          <ActionIcon onClick={handleEdit}>
            <Edit size={14} />
          </ActionIcon>
        </Tooltip>
      )}
    </Flex>
  );
};

export default MessageFunctions;
