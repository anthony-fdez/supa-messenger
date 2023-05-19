import { CornerUpLeft, Edit } from "react-feather";
import React from "react";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { openModal } from "@mantine/modals";
import useGlobalStore, {
  IDatabaseMessages,
} from "../../../../../store/useGlobalStore";
import MessageReply from "../MessageReply/MessageReply";

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

  const replyModal = () => {
    openModal({
      keepMounted: false,
      title: "Reply",
      overlayProps: {
        blur: 5,
      },
      children: <MessageReply message={message} />,
    });
  };

  return (
    <Flex gap={5}>
      <Tooltip
        withArrow
        withinPortal
        label="Reply"
      >
        <ActionIcon onClick={replyModal}>
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
