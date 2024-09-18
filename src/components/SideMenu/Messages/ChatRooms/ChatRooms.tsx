import { Alert, Badge, Button, Flex, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import React from "react";
import { MessageSquare } from "react-feather";
import { useNavigate } from "react-router";
import useGlobalStore from "../../../../store/useGlobalStore";
import useSideMenuStyles from "../../SideMenu.styles";
import NewRoomModal from "./Components/NewRoomModal";

const ChatRooms = (): JSX.Element => {
  const { classes, cx } = useSideMenuStyles();
  const { app, setApp, rooms, unreadMessages } = useGlobalStore();
  const navigate = useNavigate();

  const renderLoader = (): JSX.Element => {
    if (rooms.length === 0) {
      return (
        <Alert
          mt={0}
          m={10}
          title="So empty"
        >
          Looks like you don&apos;t have any rooms yet. Create one to start
          chatting with people.
        </Alert>
      );
    }

    return (
      <>
        {rooms.map((room) => {
          const unread = unreadMessages.find((r) => r.room_id === room.id);

          return (
            <a
              key={room.id}
              className={cx(classes.link, {
                [classes.linkActive]:
                  app.secondaryActiveSideMenu === room.id.toString(),
              })}
              href="/"
              onClick={(event): void => {
                event.preventDefault();
                setApp({
                  secondaryActiveSideMenu: room.id.toString(),
                  isMobileMenuOpen: false,
                });
                navigate(`/app/chat/${room.id}`);
              }}
            >
              <Flex
                align="center"
                justify="space-between"
              >
                {unread && unread?.message_count >= 1 && (
                  <Badge
                    variant="filled"
                    color="red"
                    mr={8}
                  >
                    {unread.message_count || 0}
                  </Badge>
                )}

                <Text lineClamp={1}>{room.name}</Text>
              </Flex>
            </a>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <Button
        className={classes.newRoomButton}
        leftIcon={<MessageSquare size={16} />}
        onClick={(): void => {
          openModal({
            title: "New Chat Room",
            children: <NewRoomModal navigate={navigate} />,
            withCloseButton: true,
            overlayProps: {
              blur: 5,
            },
          });
        }}
        variant="outline"
      >
        Create New Room
      </Button>
      {renderLoader()}
    </div>
  );
};

export default ChatRooms;
