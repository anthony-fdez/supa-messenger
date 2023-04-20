import { ActionIcon, Loader, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { Send } from "react-feather";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Database } from "../../../../../types/database.types";
import useGlobalStore from "../../../../store/useGlobalStore";
import useTypingBroadCast from "../../../../Hooks/rooms/useTypingBroadcast";

interface Props {
  roomChannel: RealtimeChannel;
}

const MessagesTextInput = ({ roomChannel }: Props): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  const {
    currentRoom: { roomData, usersTyping },
  } = useGlobalStore();

  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useTypingBroadCast({ roomChannel, message });

  const getUsersTypingMessage = () => {
    if (!usersTyping) return false;

    if (usersTyping.length === 1) {
      return `${usersTyping[0].name} is typing...`;
    }

    if (usersTyping.length === 2) {
      return `${usersTyping[0].name} and ${usersTyping[1].name} are typing...`;
    }

    if (usersTyping.length >= 3) {
      return "Multiple people typing...";
    }

    return true;
  };

  const onMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.length === 0) {
      showNotification({
        message: "Bruh you gotta type something",
        title: "Error",
        color: "red",
        variant: "filled",
      });

      return;
    }

    if (!roomData?.id || !session?.user.id) {
      showNotification({
        title: "Error",
        message: "Unable to send message",
      });

      return;
    }
    const noMessageNotification = [
      "At least type something",
      "Message is empty!",
      "I think you forgot to type something",
      "Wow, sending a message with no message",
    ];
    const ranInt = Math.floor(Math.random() * 4);
    if (message.length <= 0) {
      showNotification({
        title: "Error",
        message: `${noMessageNotification[ranInt]}`,
      });

      return;
    }

    setIsSendingMessage(true);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        message_body: message,
        room_id: roomData.id,
        is_edited: false,
        user_id: session.user.id,
      })
      .select()
      .single();

    if (!data || error) {
      console.log(error);
      setIsSendingMessage(false);
      showNotification({
        title: "Error",
        message: "Unable to send message.",
      });

      return;
    }

    setIsSendingMessage(false);
    setMessage("");
  };

  const sendButton = (): JSX.Element | null => {
    if (message.length <= 0) return null;

    return (
      <ActionIcon type="submit">
        {isSendingMessage ? <Loader size={16} /> : <Send size={16} />}
      </ActionIcon>
    );
  };

  return (
    <form onSubmit={(e): Promise<void> => onMessageSend(e)}>
      <TextInput
        onChange={(event): void => setMessage(event.target.value)}
        placeholder="Send message"
        rightSection={sendButton()}
        value={message}
        spellCheck="false"
        autoComplete="off"
        label={getUsersTypingMessage()}
      />
    </form>
  );
};

export default MessagesTextInput;
