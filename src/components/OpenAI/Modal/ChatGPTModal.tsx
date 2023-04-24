import {
  Button,
  Card,
  Flex,
  Modal,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Typist from "react-typist-component";
import useHttp from "../../../Hooks/useHttp";
import useGlobalStore from "../../../store/useGlobalStore";
import useModalStyles from "./useModalStyles";
import { openModal } from "@mantine/modals";
import Tldr from "./Tldr/Tldr";

const ChatGptModal = (): JSX.Element => {
  const { classes } = useModalStyles();

  const {
    app: { isTldrMenuOpen },
    user: { uid },
    currentRoom: { messages },
    setApp,
  } = useGlobalStore();

  const getConversationContext = () => {
    const conversationContext: string[] = [];

    messages?.forEach((message) => {
      // @ts-ignore
      if (message.userData.id === uid) {
        conversationContext.push(
          // @ts-ignore
          `You: ${message.message_body}`,
        );

        return;
      }

      conversationContext.push(
        // @ts-ignore
        `${message.userData.name}: ${message.message_body}`,
      );
    });

    return conversationContext.join("\n");
  };

  return (
    <Modal
      title="ChatGPT Tools"
      overlayProps={{
        blur: 5,
      }}
      opened={isTldrMenuOpen}
      onClose={() => {
        setApp({
          isTldrMenuOpen: false,
        });
      }}
      keepMounted={false}
    >
      <Card
        onClick={() => {
          setApp({
            isTldrMenuOpen: false,
          });
          openModal({
            overlayProps: {
              blur: 5,
            },
            title: "TL;DR",
            children: <Tldr />,
          });
        }}
        withBorder
        className={classes.card}
      >
        <Title size={18}>Generate a summary - TL;DR</Title>
        <Text>Get the current chat history and generate a brief summary</Text>
      </Card>
      <Card
        withBorder
        className={classes.card}
      >
        <Title size={18}>Be a Menace</Title>
        <Text>Insult everyone (respectfully)</Text>
      </Card>
      <Flex
        onClick={() => setApp({ isTldrMenuOpen: false })}
        justify="flex-end"
        mt={20}
      >
        <Button>Close</Button>
      </Flex>
    </Modal>
  );
};

export default ChatGptModal;
