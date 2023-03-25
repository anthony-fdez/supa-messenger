import React from "react";
import { Flex, Text } from "@mantine/core";
import moment from "moment";
import useGlobalStore from "../../../../store/useGlobalStore";
import UserAvatar from "../../../../components/UserAvatar/UserAvatar";

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
            <UserAvatar
              // @ts-ignore
              image={message.userData.image_url}
              size={30}
              // @ts-ignore
              user_email={message.userData.email}
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
