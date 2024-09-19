import { Alert, Button, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import React from "react";
import useGlobalStore from "../../../../store/useGlobalStore";
import useSideMenuStyles from "../../SideMenu.styles";
import NewRoomModal from "../ChatRooms/Components/NewRoomModal";
import { PublicRoomsLoaderSkeleton } from "./PublicRoomsLoaderSkeleton";
import { useGetPublicRooms } from "../../../../Hooks/useGetPublicRooms";

const PublicRooms = (): JSX.Element => {
  const navigate = useNavigate();
  const { classes, cx } = useSideMenuStyles();
  const { app, setApp } = useGlobalStore();

  const { isLoading, publicRooms } = useGetPublicRooms();

  if (isLoading) {
    return <PublicRoomsLoaderSkeleton />;
  }

  if (!publicRooms) {
    return (
      <Alert
        color="red"
        m={10}
        title="Error"
      >
        We were unable to get the public rooms at the moment.
      </Alert>
    );
  }

  if (publicRooms.length === 0) {
    return (
      <Alert
        m={10}
        title="So empty"
      >
        There are no public rooms at the moment. Be a man... and create that
        first room
        <Button
          fullWidth
          mt={15}
          onClick={(): void => {
            openModal({
              title: "Create room",
              children: <NewRoomModal navigate={navigate} />,
              overlayProps: {
                blur: 5,
              },
            });
          }}
        >
          Create a room
        </Button>
      </Alert>
    );
  }

  return (
    <div>
      {publicRooms.map((room) => {
        if (room.is_private) return null;

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
              navigate(`/chat/${room.id}`);
            }}
          >
            <Text lineClamp={1}>{room.name}</Text>
          </a>
        );
      })}
    </div>
  );
};

export default PublicRooms;
