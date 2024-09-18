import { Accordion, Badge } from "@mantine/core";
import React, { useState } from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import FriendsList from "../../Friends/FriendsList/FriendsList";
import FriendsPendingList from "../../Friends/FriendsPendingList/FriendsPendingList";
import FriendsRequestsList from "../../Friends/FriendsRequestsList/FriendsRequestsList";

export const SideMenuFriends = (): JSX.Element => {
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
};
