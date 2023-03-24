import { ActionIcon, TextInput } from "@mantine/core";
import React from "react";
import { Send } from "react-feather";

const MessagesTextInput = (): JSX.Element => {
  return (
    <TextInput
      placeholder="Send message"
      rightSection={
        <ActionIcon>
          <Send size={16} />
        </ActionIcon>
      }
    />
  );
};

export default MessagesTextInput;
