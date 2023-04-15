import { Flex, Text } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import UserAvatarWithIndicator from "../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";
import useGlobalStore from "../../../../store/useGlobalStore";

const Messages = (): JSX.Element => {
  const messagesEndRef = useRef(null);
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

  return (
    <div>
      {messages.map((message) => {
        return (
          <Flex
            key={message.id}
            mb={10}
          >
            <div style={{ zIndex: "-1" }}>
              <UserAvatarWithIndicator
                // @ts-ignore
                user_email={message.userData.email}
                size={30}
                // @ts-ignore
                image={message.userData.image_url}
              />
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
