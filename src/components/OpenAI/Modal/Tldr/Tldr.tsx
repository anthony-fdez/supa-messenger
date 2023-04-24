import { Button, Flex, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Typist from "react-typist-component";
import { closeAllModals } from "@mantine/modals";
import useHttp from "../../../../Hooks/useHttp";
import useGlobalStore from "../../../../store/useGlobalStore";

const Tldr = (): JSX.Element => {
  const { http } = useHttp();

  const {
    user: { uid },
    currentRoom: { messages },
  } = useGlobalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [tldr, setTldr] = useState<string>("");

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

  useEffect(() => {
    const generateTldr = async () => {
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

    generateTldr();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
            width="40%"
            height={30}
            mb={10}
          />
        </>
      ) : (
        <Typist
          splitter={(text) => text.split(" ").join("### ").split("###")}
          typingDelay={100}
        >
          {tldr}
        </Typist>
      )}
      <Flex
        justify="flex-end"
        mt={20}
      >
        <Button
          onClick={() => {
            closeAllModals();
          }}
        >
          Close
        </Button>
      </Flex>
    </div>
  );
};

export default Tldr;
