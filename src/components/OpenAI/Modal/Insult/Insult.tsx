import { Button, Flex, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Typist from "react-typist-component";
import { closeAllModals } from "@mantine/modals";
import useHttp from "../../../../Hooks/useHttp";
import useGlobalStore from "../../../../store/useGlobalStore";

const Insult = (): JSX.Element => {
  const { http } = useHttp();

  const {
    user: { uid },
    currentRoom: { messages },
    setCurrentRoom,
  } = useGlobalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState<string>("");

  const getConversationContext = () => {
    const conversationContext: string[] = [];

    const last10Messages = messages?.slice(-10);

    last10Messages?.forEach((message) => {
      // @ts-ignore
      if (message.userData.id === uid) {
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
        endpoint: "/ai/insult",
        body: {
          prompt: getConversationContext(),
        },
      });

      setText(response.data);
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
          splitter={(t) => t.split(" ").join("### ").split("###")}
          typingDelay={100}
        >
          {text}
        </Typist>
      )}
      <Flex
        justify="flex-end"
        mt={20}
      >
        {text && (
          <Button
            variant="light"
            mr={10}
            onClick={() => {
              setCurrentRoom({
                myMessage: text,
              });

              closeAllModals();
            }}
          >
            Send to chat
          </Button>
        )}

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

export default Insult;
