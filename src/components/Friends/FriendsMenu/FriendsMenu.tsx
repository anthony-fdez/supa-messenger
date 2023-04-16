import React from "react";
import { Drawer } from "@mantine/core";
import useGlobalStore from "../../../store/useGlobalStore";
import FriendsList from "../FriendsList/FriendsList";

const FriendsMenu = (): JSX.Element => {
  const {
    app: { isFriendsMenuOpen },
    setApp,
  } = useGlobalStore();

  return (
    <Drawer
      title="Friends"
      overlayProps={{
        blur: 5,
      }}
      onClose={() => {
        setApp({
          isFriendsMenuOpen: false,
        });
      }}
      opened={isFriendsMenuOpen}
    >
      <FriendsList />
    </Drawer>
  );
};

export default FriendsMenu;
