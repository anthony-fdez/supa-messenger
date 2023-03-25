import React from "react";
import { Avatar, Flex, Text } from "@mantine/core";
import useGlobalStore from "../../../../store/useGlobalStore";
import moment from "moment";

const Messages = (): JSX.Element => {
  const {
    currentRoom: { messages },
  } = useGlobalStore();

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
    </div>
  );
};

export default Messages;
