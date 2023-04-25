import { Box, Collapse, Divider, ScrollArea } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import useGlobalStore from "../../../../store/useGlobalStore";

import EmptyRoom from "../../../../components/InfoScreens/EmptyRoom";
import Message from "./Message/Message";

const Messages = (): JSX.Element => {
  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    currentRoom: { messages, roomParticipants },
    user: { uid },
  } = useGlobalStore();

  const [lastMessageRead, setLastMessageRead] = useState<number | null>(null);
  const [showLastReadLabel, setShowLastReadLabel] = useState(true);

  useEffect(() => {
    scrollToBottom();
  }, [messages?.length]);

  useEffect(() => {
    if (!roomParticipants) return;
    if (roomParticipants.length === 0) return;

    const me = roomParticipants.find(
      (participant) => participant.user_id === uid,
    );

    if (me) {
      setLastMessageRead(me.last_message_read);
    }
  }, [roomParticipants, uid, messages]);

  useEffect(() => {
    if (!lastMessageRead) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowLastReadLabel(false);
    }, 5000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeout);
    };
  }, [lastMessageRead]);

  if (!messages) return <p>Error loading messages</p>;
  if (messages.length === 0) return <EmptyRoom />;

  return (
    <ScrollArea
      w="100%"
      h="calc(100%)"
    >
      <Box>
        {messages.map((message) => {
          return (
            <>
              <Message
                key={message.id}
                message={message}
              />
              <Collapse
                in={
                  lastMessageRead === message.id &&
                  lastMessageRead !== messages[messages.length - 1].id &&
                  showLastReadLabel
                }
              >
                <Divider
                  mt={10}
                  mb={20}
                  labelPosition="left"
                  label="NEW"
                  color="red"
                />
              </Collapse>
            </>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
    </ScrollArea>
  );
};

export default Messages;
