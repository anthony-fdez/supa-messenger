import { Avatar, Indicator } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useGlobalStore from "../../store/useGlobalStore";

interface Props {
  image: string;
  size: number;
  user_email: string;
}

const UserAvatarWithIndicator = ({
  image,
  size,
  user_email,
}: Props): JSX.Element => {
  const {
    app,
    app: { onlineUsers },
  } = useGlobalStore();

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!onlineUsers) return;
    setIsOnline(false);

    // eslint-disable-next-line consistent-return
    Object.keys(onlineUsers).forEach((key) => {
      if (key === user_email) {
        return setIsOnline(true);
      }
    });
  }, [onlineUsers, user_email, app]);

  return (
    <Indicator
      disabled={!isOnline}
      offset={5}
      position="bottom-end"
      size={15}
      withBorder
    >
      <Avatar
        radius="xl"
        size={size}
        src={image}
      />
    </Indicator>
  );
};

export default UserAvatarWithIndicator;
