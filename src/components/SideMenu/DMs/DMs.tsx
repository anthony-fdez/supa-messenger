import React from "react";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router";
import useGlobalStore, {
  IDatabaseParticipants,
} from "../../../store/useGlobalStore";
import useSideMenuStyles from "../SideMenu.styles";

const DMs = (): JSX.Element => {
  const { classes, cx } = useSideMenuStyles();
  const { app, setApp, dms } = useGlobalStore();
  const navigate = useNavigate();

  const getFriendName = (participants: IDatabaseParticipants[]) => {
    console.log(participants);

    if (participants.length !== 2) return "Error";

    return "";
  };

  return (
    <div>
      {dms.map((room) => (
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
          <Text lineClamp={1}>{getFriendName(room.participants)}</Text>
        </a>
      ))}
    </div>
  );
};

export default DMs;
