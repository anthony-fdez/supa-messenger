import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";
import { Send } from "react-feather";
import { Alert, Button, Flex, Textarea } from "@mantine/core";
import { Database } from "../../../../../../types/database.types";
import { IDatabaseMessages } from "../../../../../store/useGlobalStore";

interface Props {
  message: IDatabaseMessages;
}

const MessageReply = ({ message }: Props): JSX.Element => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const [reply, setReply] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const onMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noMessageNotification = [
      "At least type something",
      "Message is empty!",
      "I think you forgot to type something",
      "Wow, sending a message with no message",
    ];

    const ranInt = Math.floor(Math.random() * 4);

    if (reply.length <= 0) {
      showNotification({
        title: "Error",
        color: "red",
        variant: "filled",
        message: `${noMessageNotification[ranInt]}`,
      });

      return;
    }

    if (!message.room_id || !session?.user.id) {
      showNotification({
        title: "Error",
        message: "Unable to send message",
      });

      return;
    }

    setIsSendingMessage(true);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        message_body: reply,
        room_id: message.room_id,
        is_edited: false,
        user_id: session.user.id,
        replying_to: message.id,
      })
      .select()
      .single();

    if (!data || error) {
      setIsSendingMessage(false);
      showNotification({
        title: "Error",
        message: "Unable to send message.",
      });

      return;
    }

    setIsSendingMessage(false);
    setReply("");
    closeAllModals();
  };

  return (
    <form
      onSubmit={(e) => {
        onMessageSend(e);
      }}
    >
      {/* @ts-ignore */}
      <Alert title={`Replying to: ${message.userData.name}`}>
        {message.message_body}
      </Alert>
      <Textarea
        mt={20}
        label="Reply"
        placeholder="Write your reply"
        minRows={1}
        autosize
        required
        onChange={(e) => setReply(e.target.value)}
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
        <Button
          rightIcon={<Send size={14} />}
          loading={isSendingMessage}
          type="submit"
        >
          Send
        </Button>
      </Flex>
    </form>
  );
};

export default MessageReply;
