import {
  ActionIcon,
  Box,
  Flex,
  Loader,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import UserAvatarWithIndicator from "../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";
import useGlobalStore from "../../../../store/useGlobalStore";
import MessageFunctions from "./components/MessageFunctions";
import useMessageStyles from "./useMessageStyles";

import { Database } from "../../../../../types/database.types";
import EmptyRoom from "../../../../components/InfoScreens/EmptyRoom";
import UserPopup from "../../../../components/UserPopup/UserPopup";

const Messages = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const { classes } = useMessageStyles();
  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    currentRoom: { messages },
  } = useGlobalStore();

  useEffect(() => {
    scrollToBottom();
  }, [messages?.length]);
  interface IMessage {
    created_at: string | null;
    id: number;
    is_edited: boolean;
    message_body: string;
    room_id: number;
    thread_id: number | null;
    user_id: string;
  }
  const [indexOfEdit, setIndexOfEdit] = useState(-1);
  const [editMessage, setEditMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleEdit = (message: IMessage, index: number) => {
    if (index === indexOfEdit) {
      setIndexOfEdit(-1);
    } else {
      setIndexOfEdit(index);
    }
    setEditMessage(message.message_body);
    console.log(messages);
    console.log(message);
  };

  const onEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    message: IMessage,
  ) => {
    e.preventDefault();

    setIsSendingMessage(true);
    console.log(message.id);

    const { error } = await supabase
      .from("messages")
      .update({
        message_body: editMessage,
      })
      .eq("id", message.id);

    if (error) {
      setIsSendingMessage(false);
      return showNotification({
        title: "Error",
        message: "Unable to send message.",
      });
    }

    setIsSendingMessage(false);
    setIndexOfEdit(-1);
    return setEditMessage("");
  };

  const sendButton = (): JSX.Element | null => {
    if (editMessage.length <= 0) return null;

    return (
      <ActionIcon type="submit">
        {isSendingMessage ? <Loader size={16} /> : <Send size={16} />}
      </ActionIcon>
    );
  };

  if (!messages) return <p>Error loading messages</p>;
  if (messages.length === 0) return <EmptyRoom />;

  return (
    <ScrollArea
      w="100%"
      h="calc(100%)"
    >
      <Box>
        {messages.map((message, index) => {
          return (
            <Flex
              key={message.id}
              mb={10}
              className={classes.messageDiv}
            >
              <div className={classes.avatarDiv}>
                <UserPopup
                  user={{
                    // @ts-ignore
                    email: message.userData.email || "",
                    // @ts-ignore
                    id: message.userData.id || "",
                    // @ts-ignore
                    imageUrl: message.userData.image_url || "",
                    // @ts-ignore
                    name: message.userData.name || "",
                  }}
                >
                  <UserAvatarWithIndicator
                    // @ts-ignore
                    user_email={message.userData.email}
                    size={30}
                    // @ts-ignore
                    image={message.userData.image_url}
                  />
                </UserPopup>
              </div>
              <div style={{ marginLeft: 10 }}>
                <Text
                  c="dimmed"
                  size={14}
                >
                  {/* @ts-ignore */}
                  {`${message.userData.name} - ${moment(
                    message.created_at,
                  ).fromNow()}`}
                </Text>
                {indexOfEdit === index ? (
                  <form onSubmit={(e): Promise<void> => onEdit(e, message)}>
                    <TextInput
                      onChange={
                        (event): void =>
                          // eslint-disable-next-line max-len
                          // eslint-disable-next-line react/jsx-curly-newline, implicit-arrow-linebreak
                          setEditMessage(event.target.value)
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                      placeholder="Send message"
                      rightSection={sendButton()}
                      value={editMessage}
                      spellCheck="false"
                      autoComplete="off"
                    />
                  </form>
                ) : (
                  <Text>{message.message_body}</Text>
                )}
              </div>
              <div className={classes.messageFunctionsDiv}>
                <MessageFunctions
                  handleEdit={() => handleEdit(message, index)}
                />
              </div>
            </Flex>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
    </ScrollArea>
  );
};

export default Messages;
