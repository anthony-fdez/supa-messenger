import { Accordion, Badge, Tabs } from "@mantine/core";
import React, { useState } from "react";
import { Clock, PhoneIncoming, Users } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import FriendsList from "../../Friends/FriendsList/FriendsList";
import FriendsRequestsList from "../../Friends/FriendsRequestsList/FriendsRequestsList";
import FriendsPendingList from "../../Friends/FriendsPendingList/FriendsPendingList";

const FriendsSideMenuScreen = (): JSX.Element => {
  const {
    friendships: { friends, requests, pending },
  } = useGlobalStore();

  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "friends",
  );

  return (
    <Accordion
      m={10}
      variant="separated"
      value={activeAccordion}
      onChange={setActiveAccordion}
    >
      <Accordion.Item value="friends">
        <Accordion.Control>{`Friends ${friends.length}`}</Accordion.Control>
        <Accordion.Panel>
          <FriendsList />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="requests">
        <Accordion.Control>
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
        </Accordion.Control>
        <Accordion.Panel>
          <FriendsRequestsList />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="pending">
        <Accordion.Control>
          Pending
          {pending.length !== 0 && <Badge ml={5}>{pending.length}</Badge>}
        </Accordion.Control>
        <Accordion.Panel>
          <FriendsPendingList />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

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

export default FriendsSideMenuScreen;
