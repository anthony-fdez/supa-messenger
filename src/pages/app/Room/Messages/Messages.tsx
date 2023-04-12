import { Avatar, Flex, Text } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import useGlobalStore from "../../../../store/useGlobalStore";

const Messages = (): JSX.Element => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    currentRoom: { messages },
  } = useGlobalStore();

  useEffect(() => {
    console.log("triggered");
    scrollToBottom();
  }, [messages?.length]);

  if (!messages) return <p>Error loading messages</p>;

  return (
    <div>
      {messages.map((message) => {
        return (
          <Flex
            key={message.id}
            mb={10}
          >
            <Avatar
              radius="xl"
              size={30}
              style={{ zIndex: -1 }}
              // @ts-ignore
              src={message.userData.image_url}
            />
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
              <Text>{message.message_body}</Text>
            </div>
          </Flex>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
