import { Box, ScrollArea } from "@mantine/core";
import React, { useEffect, useRef } from "react";
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
    currentRoom: { messages },
  } = useGlobalStore();

  useEffect(() => {
    scrollToBottom();
  }, [messages?.length]);

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
            <Message
              key={message.id}
              message={message}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
    </ScrollArea>
  );
};

export default Messages;
