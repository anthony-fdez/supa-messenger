import { Drawer, Tabs } from "@mantine/core";
import React from "react";
import { Clock, PhoneIncoming, Users } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import FriendsList from "../FriendsList/FriendsList";
import FriendsPendingList from "../FriendsPendingList/FriendsPendingList";
import FriendsRequestsList from "../FriendsRequestsList/FriendsRequestsList";

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
      <Tabs defaultValue="friends">
        <Tabs.List>
          <Tabs.Tab
            value="friends"
            icon={<Users size="0.8rem" />}
          >
            Friends
          </Tabs.Tab>
          <Tabs.Tab
            value="requests"
            icon={<PhoneIncoming size="0.8rem" />}
          >
            Requests
          </Tabs.Tab>
          <Tabs.Tab
            value="pending"
            icon={<Clock size="0.8rem" />}
          >
            Pending
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          value="friends"
          pt="xs"
        >
          <FriendsList />
        </Tabs.Panel>

        <Tabs.Panel
          value="requests"
          pt="xs"
        >
          <FriendsRequestsList />
        </Tabs.Panel>

        <Tabs.Panel
          value="pending"
          pt="xs"
        >
          <FriendsPendingList />
        </Tabs.Panel>
      </Tabs>
    </Drawer>
  );
};

export default FriendsMenu;
