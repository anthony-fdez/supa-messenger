import { Accordion, Badge, Collapse, Flex, Loader, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import PublicRooms from "./PublicRooms/PublicRooms";
import ChatRooms from "./ChatRooms/ChatRooms";
import DMs from "./DMs/DMs";
import useGlobalStore from "../../../store/useGlobalStore";
import getUnreadMessagesInDms from "../../../helpers/getUnreadMessagesInDms";
import getUnreadMessagesInRooms from "../../../helpers/getUnreadMessagesInRooms";

export const SideMenuMessages = (): JSX.Element => {
  const { app, setApp, unreadMessages, dms, rooms } = useGlobalStore();

  const [unreadDms, setUnreadDms] = useState<number>(0);
  const [unreadRooms, setUnreadRooms] = useState<number>(0);

  useEffect(() => {
    if (unreadMessages.length === 0) return;

    setUnreadDms(getUnreadMessagesInDms({ unreadMessages, dms }));
    setUnreadRooms(getUnreadMessagesInRooms({ rooms, unreadMessages }));
  }, [unreadMessages, rooms, dms]);

  return (
    <>
      <Collapse in={app.isLoadingRooms}>
        <Flex
          align="center"
          p={20}
          pt={0}
        >
          <Loader
            mr={10}
            size={20}
          />
          <Text size={14}>Updating...</Text>
        </Flex>
      </Collapse>
      <Accordion
        variant="separated"
        onChange={(value) => {
          setApp({ messageAccordionSelected: value });
        }}
        value={app.messageAccordionSelected}
        sx={{
          marginLeft: 10,
          marginRight: 10,
          ".mantine-Accordion-content": {
            padding: 0,
            paddingTop: 20,
            paddingBottom: 20,
          },
        }}
      >
        <Accordion.Item value="dms">
          <Accordion.Control>
            <Flex align="center">
              {unreadDms !== 0 && app.messageAccordionSelected !== "dms" && (
                <Badge
                  mr={8}
                  color="red"
                  variant="filled"
                >
                  {unreadDms}
                </Badge>
              )}

              <Text>DMs</Text>
            </Flex>
          </Accordion.Control>

          <Accordion.Panel>
            <DMs />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="chat-rooms">
          <Accordion.Control>
            <Flex align="center">
              {unreadRooms !== 0 &&
                app.messageAccordionSelected !== "chat-rooms" && (
                  <Badge
                    mr={8}
                    color="red"
                    variant="filled"
                  >
                    {unreadRooms}
                  </Badge>
                )}

              <Text>My Rooms</Text>
            </Flex>
          </Accordion.Control>
          <Accordion.Panel>
            <ChatRooms />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="public-chat-rooms">
          <Accordion.Control>
            <Flex align="center">
              <Text>Public Chat Rooms</Text>
            </Flex>
          </Accordion.Control>
          <Accordion.Panel>
            <PublicRooms />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
