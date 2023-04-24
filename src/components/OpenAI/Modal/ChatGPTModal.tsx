import { Button, Card, Flex, Modal, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import Tldr from "./Tldr/Tldr";
import useModalStyles from "./useModalStyles";
import Insult from "./Insult/Insult";

const ChatGptModal = (): JSX.Element => {
  const { classes } = useModalStyles();

  const {
    app: { isTldrMenuOpen },

    setApp,
  } = useGlobalStore();

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
        onClick={() => {
          setApp({
            isTldrMenuOpen: false,
          });
          openModal({
            overlayProps: {
              blur: 5,
            },
            title: "BE A MENACE",
            children: <Insult />,
          });
        }}
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
