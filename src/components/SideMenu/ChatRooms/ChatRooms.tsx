import { Button, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import React from "react";
import { MessageSquare } from "react-feather";
import { useNavigate } from "react-router";
import useGlobalStore from "../../../store/useGlobalStore";
import useSideMenuStyles from "../SideMenu.styles";
import NewRoomModal from "./Components/NewRoomModal";

const ChatRooms = (): JSX.Element => {
  const { classes, cx } = useSideMenuStyles();
  const { app, setApp, rooms } = useGlobalStore();
  const navigate = useNavigate();

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
      {rooms.map((room) => (
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
            });
            navigate(`/chat/${room.id}`);
          }}
        >
          <Text lineClamp={1}>{room.name}</Text>
        </a>
      ))}
    </div>
  );
};

export default ChatRooms;
