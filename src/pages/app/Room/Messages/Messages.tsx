import { Box, Collapse, Divider, ScrollArea, Skeleton } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useGlobalStore from "../../../../store/useGlobalStore";

import EmptyRoom from "../../../../components/InfoScreens/EmptyRoom";
import Message from "./Message/Message";

const Messages = (): JSX.Element => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView();
  };

  const {
    currentRoom: { messages, roomParticipants, isLoadingMessages },
    user: { uid },
  } = useGlobalStore();

  const [lastMessageRead, setLastMessageRead] = useState<number | null>(null);
  const [showLastReadLabel, setShowLastReadLabel] = useState(true);

  useEffect(() => {
    scrollToBottom();
  }, [messages?.length]);

  useEffect(() => {
    if (!roomParticipants) return;
    if (roomParticipants.length === 0) return;

    const me = roomParticipants.find(
      (participant) => participant.user_id === uid,
    );

    if (me) {
      setLastMessageRead(me.last_message_read);
    }
  }, [roomParticipants, uid, messages]);

  useEffect(() => {
    if (!lastMessageRead) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowLastReadLabel(false);
    }, 5000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeout);
    };
  }, [lastMessageRead]);

  if (isLoadingMessages) {
    return (
      <>
        <Skeleton
          h={30}
          mb={10}
          width="50%"
        />
        <Skeleton
          h={30}
          mb={10}
          width="80%"
        />
        <Skeleton
          h={30}
          mb={10}
          width="35%"
        />
        <Skeleton
          h={30}
          mb={10}
          width="40%"
        />
        <Skeleton
          h={30}
          mb={10}
          width="60%"
        />
        <Skeleton
          h={30}
          mb={10}
          width="20%"
        />
        <Skeleton
          h={30}
          mb={10}
          width="30%"
        />
      </>
    );
  }

  if (!messages) return <p>Error loading messages</p>;
  if (messages.length === 0) return <EmptyRoom />;

  return (
    <ScrollArea
      w="100%"
      h="calc(100%)"
    >
      <Box>
        {messages.map((message) => {
          return (
            <motion.div layout>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Message
                    key={message.id}
                    message={message}
                  />
                </motion.div>

                <Collapse
                  in={
                    lastMessageRead === message.id &&
                    lastMessageRead !== messages[messages.length - 1].id &&
                    showLastReadLabel
                  }
                >
                  <Divider
                    mt={10}
                    mb={20}
                    labelPosition="left"
                    label="NEW"
                    color="red"
                  />
                </Collapse>
              </AnimatePresence>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
    </ScrollArea>
  );
};

export default Messages;
