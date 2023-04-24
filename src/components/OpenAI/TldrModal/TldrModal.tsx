import { Button, Flex, Modal, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Typist from "react-typist-component";
import useHttp from "../../../Hooks/useHttp";
import useGlobalStore from "../../../store/useGlobalStore";

const TldrModal = (): JSX.Element => {
  const { http } = useHttp();
  const {
    app: { isTldrMenuOpen },
    currentRoom: { messages },
    setApp,
  } = useGlobalStore();

  const [tldr, setTldr] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getConversationContext = () => {
    const conversationContext: string[] = [];

    messages?.forEach((message) => {
      console.log(message);

      conversationContext.push(
        // @ts-ignore
        `${message.userData.name}: ${message.message_body}`,
      );
    });

    return conversationContext.join("\n");
  };

  console.log(getConversationContext());

  useEffect(() => {
    if (!isTldrMenuOpen) return;

    const getResponse = async () => {
      setIsLoading(true);
      const response = await http({
        method: "POST",
        endpoint: "/ai/tldr",
        body: {
          prompt: getConversationContext(),
        },
      });

      setTldr(response.data);
      setIsLoading(false);
    };

    getResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTldrMenuOpen]);

  return (
    <Modal
      title="TLDR"
      overlayProps={{
        blur: 5,
      }}
      size="lg"
      opened={isTldrMenuOpen}
      onClose={() => {
        setApp({
          isTldrMenuOpen: false,
        });
      }}
      keepMounted={false}
    >
      {isLoading ? (
        <>
          <Skeleton
            width="100%"
            height={30}
            mb={10}
          />
          <Skeleton
            width="100%"
            height={30}
            mb={10}
          />
          <Skeleton
            width="100%"
            height={30}
            mb={10}
          />
          <Skeleton
            width="100%"
            height={30}
            mb={10}
          />
        </>
      ) : (
        <Typist
          splitter={(text) => text.split("")}
          typingDelay={10}
        >
          {tldr}
        </Typist>
      )}
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

export default TldrModal;
