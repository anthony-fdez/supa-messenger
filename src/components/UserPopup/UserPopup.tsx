import React from "react";
import { Loader, Menu } from "@mantine/core";
import { Coffee, UserPlus } from "react-feather";
import useSendFriendRequest from "../../Hooks/friendships/useSendFriendRequest";
import FriendsConditionalRendering from "../Friends/FriendsConditionalRendering/FriendsConditionalrendering";

interface Props {
  children: JSX.Element;
  user: {
    email: string;
    id: string;
    imageUrl: string;
    name: string;
  };
}

const UserPopup = ({ user, children }: Props): JSX.Element => {
  const { isLoading: isLoadingSendFriendRequest, sendFriendRequest } =
    useSendFriendRequest();

  return (
    <Menu
      width="xl"
      withArrow
      position="bottom-start"
    >
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown ml={10}>
        <Menu.Label>{user.name}</Menu.Label>
        <Menu.Item icon={<Coffee size={16} />}>
          View Profile (coming eventually)
        </Menu.Item>
        <FriendsConditionalRendering
          renderIf="NOT_FRIENDS"
          userId={user.id}
        >
          <Menu.Item
            closeMenuOnClick={false}
            onClick={() => {
              sendFriendRequest({
                friendEmail: user.email,
                friendId: user.id,
              });
            }}
            icon={
              isLoadingSendFriendRequest ? (
                <Loader size={16} />
              ) : (
                <UserPlus size={16} />
              )
            }
          >
            Send friend request
          </Menu.Item>
        </FriendsConditionalRendering>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserPopup;
