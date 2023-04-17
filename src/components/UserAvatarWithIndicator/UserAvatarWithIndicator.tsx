import { Avatar, Indicator } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useGlobalStore from "../../store/useGlobalStore";
import constants from "../../constants/constants";

interface Props {
  checkOnline?: boolean;
  image: string;
  size: number;
  user_email: string;
}

const UserAvatarWithIndicator = ({
  image,
  size,
  user_email,
  checkOnline = false,
}: Props): JSX.Element => {
  const {
    app,
    app: { onlineUsers },
  } = useGlobalStore();

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!checkOnline) return;
    if (!onlineUsers) return;
    setIsOnline(false);

    // eslint-disable-next-line consistent-return
    Object.keys(onlineUsers).forEach((key) => {
      if (key === user_email) {
        return setIsOnline(true);
      }
    });
  }, [onlineUsers, user_email, app, checkOnline]);

  return (
    <Indicator
      disabled={!isOnline}
      offset={5}
      position="bottom-end"
      size={15}
      withBorder
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        radius="xl"
        size={size}
        src={image || constants.avatarPlaceholder(user_email)}
      />
    </Indicator>
  );
};

export default UserAvatarWithIndicator;
