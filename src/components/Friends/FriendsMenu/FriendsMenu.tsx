import { Badge, Tabs } from "@mantine/core";
import React from "react";
import { Clock, PhoneIncoming, Users } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import FriendsList from "../FriendsList/FriendsList";
import FriendsPendingList from "../FriendsPendingList/FriendsPendingList";
import FriendsRequestsList from "../FriendsRequestsList/FriendsRequestsList";

const FriendsMenu = (): JSX.Element => {
  const {
    friendships: { friends, requests, pending },
  } = useGlobalStore();

  return (
    <Tabs defaultValue="friends">
      <Tabs.List>
        <Tabs.Tab
          value="friends"
          icon={<Users size="0.8rem" />}
        >
          {`Friends ${friends.length}`}
        </Tabs.Tab>
        <Tabs.Tab
          value="requests"
          icon={<PhoneIncoming size="0.8rem" />}
        >
          Requests
          {requests.length !== 0 && (
            <Badge
              color="red"
              variant="filled"
              ml={5}
            >
              {requests.length}
            </Badge>
          )}
        </Tabs.Tab>
        <Tabs.Tab
          value="pending"
          icon={<Clock size="0.8rem" />}
        >
          Pending
          {pending.length !== 0 && <Badge ml={5}>{pending.length}</Badge>}
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
  );
};

export default FriendsMenu;
