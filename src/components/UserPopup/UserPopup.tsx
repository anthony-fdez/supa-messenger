import React from "react";
import { Flex, Loader, Menu, Text, Title } from "@mantine/core";
import { Coffee, UserPlus } from "react-feather";
import useSendFriendRequest from "../../Hooks/friendships/useSendFriendRequest";
import FriendsConditionalRendering from "../Friends/FriendsConditionalRendering/FriendsConditionalrendering";
import UserAvatarWithIndicator from "../UserAvatarWithIndicator/UserAvatarWithIndicator";

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
      position="bottom-start"
      withArrow
    >
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown ml={10}>
        <Flex
          p={20}
          justify="center"
          direction="column"
          align="center"
        >
          <UserAvatarWithIndicator
            image={user.imageUrl}
            size={100}
            user_email={user.email}
            checkOnline
          />
          <Title
            mt={15}
            size={20}
            lineClamp={1}
          >
            {user.name}
          </Title>
          <Text
            size={12}
            lineClamp={1}
          >
            {user.email}
          </Text>
        </Flex>
        <Menu.Divider />
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
