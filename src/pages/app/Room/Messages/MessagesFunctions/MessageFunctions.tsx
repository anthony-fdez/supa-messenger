import React from "react";
import { CornerUpLeft, Edit } from "react-feather";

import {
  ActionIcon,
  Alert,
  Button,
  Flex,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import useGlobalStore, {
  IDatabaseMessages,
} from "../../../../../store/useGlobalStore";
import { closeAllModals, openModal } from "@mantine/modals";

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
    openModal({
      keepMounted: false,
      title: "Reply",
      overlayProps: {
        blur: 5,
      },
      children: (
        <div>
          <Alert title={`Replying to: ${message.userData.name}`}>
            {message.message_body}
          </Alert>
          <Textarea
            mt={20}
            label="Reply"
            placeholder="Write your reply"
            minRows={1}
            autosize
          />
          <Flex
            justify="flex-end"
            mt={20}
          >
            <Button
              mr={10}
              onClick={() => {
                closeAllModals();
              }}
              color="red"
              variant="light"
            >
              Cancel
            </Button>
            <Button>Send</Button>
          </Flex>
        </div>
      ),
    });
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
