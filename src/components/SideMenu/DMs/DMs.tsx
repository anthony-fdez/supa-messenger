import React from "react";
import { Badge, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import useGlobalStore from "../../../store/useGlobalStore";
import useSideMenuStyles from "../SideMenu.styles";

const DMs = (): JSX.Element => {
  const { classes, cx } = useSideMenuStyles();
  const {
    app,
    setApp,
    rooms,
    friendships: { requests },
  } = useGlobalStore();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          setApp({ isFriendsMenuOpen: true });
        }}
        variant="light"
        className={classes.newRoomButton}
        rightIcon={
          requests.length !== 0 && (
            <Badge
              color="red"
              variant="filled"
            >
              {requests.length}
            </Badge>
          )
        }
      >
        Friends
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
              isMobileMenuOpen: false,
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

export default DMs;
