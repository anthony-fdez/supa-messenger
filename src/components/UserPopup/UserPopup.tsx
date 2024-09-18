import React from "react";
import { Badge, Button, Flex, Loader, Menu, Title } from "@mantine/core";
import { MessageSquare, UserPlus, X } from "react-feather";
import { openConfirmModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import FriendsConditionalRendering from "../Friends/FriendsConditionalRendering/FriendsConditionalrendering";
import UserAvatarWithIndicator from "../UserAvatarWithIndicator/UserAvatarWithIndicator";
import useHandleFriendsRequests from "../../Hooks/friendships/useHandleFriendRequests";
import useGlobalStore from "../../store/useGlobalStore";

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
  const {
    friendships: { friends },
    setApp,
    user: { uid },
  } = useGlobalStore();

  const navigate = useNavigate();

  const { isLoading, handleSendFriendRequest, handleDeleteFriendship } =
    useHandleFriendsRequests();

  return (
    <Menu
      shadow="lg"
      width="xl"
      position="bottom-start"
      withArrow
      withinPortal
    >
      <Menu.Target>
        <div style={{ cursor: "pointer" }}>{children}</div>
      </Menu.Target>

      <Menu.Dropdown
        p={20}
        ml={10}
        sx={{ maxWidth: 250 }}
      >
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
            {user.id === uid ? `You (${user.name})` : user.name}
          </Title>
        </Flex>

        <Flex
          direction="column"
          justify="center"
          align="center"
        >
          <FriendsConditionalRendering
            userId={user.id}
            renderIf="FRIENDS"
          >
            <>
              <Badge mb={20}>You are friends</Badge>
              <Button
                loading={isLoading}
                fullWidth
                leftIcon={<MessageSquare size={14} />}
                onClick={() => {
                  const friendship = friends.find((friend) => {
                    return friend.user_id_1 === uid || friend.user_id_2 === uid;
                  });

                  setApp({
                    secondaryActiveSideMenu: friendship?.room_id,
                  });

                  navigate(`/app/chat/${friendship?.room_id}`);
                }}
              >
                {`Message ${user.name}`}
              </Button>
              <Button
                mt={10}
                loading={isLoading}
                fullWidth
                color="red"
                variant="light"
                leftIcon={<X size={14} />}
                onClick={() => {
                  const friendship = friends.find((friend) => {
                    return friend.user_id_1 === uid || friend.user_id_2 === uid;
                  });

                  if (friendship) {
                    openConfirmModal({
                      zIndex: 1001,
                      overlayProps: {
                        blur: 5,
                      },
                      labels: {
                        confirm: "Yes, delete the mofo",
                        cancel: "No, I like them",
                      },
                      title: "Are you sure you want to remove this friend?",
                      onConfirm: () => {
                        handleDeleteFriendship({
                          friendship,
                        });
                      },
                    });
                  }
                }}
              >
                Remove from friends
              </Button>
            </>
          </FriendsConditionalRendering>
          <FriendsConditionalRendering
            renderIf="PENDING"
            userId={user.id}
          >
            <Badge>Request pending</Badge>
          </FriendsConditionalRendering>
          <FriendsConditionalRendering
            renderIf="REQUEST"
            userId={user.id}
          >
            <Badge color="red">Sent you a request</Badge>
          </FriendsConditionalRendering>
        </Flex>

        <FriendsConditionalRendering
          renderIf="NOT_FRIENDS"
          userId={user.id}
        >
          <Menu.Item
            closeMenuOnClick={false}
            onClick={() => {
              handleSendFriendRequest({
                friendEmail: user.email,
                friendId: user.id,
              });
            }}
            icon={isLoading ? <Loader size={16} /> : <UserPlus size={16} />}
          >
            Send friend request
          </Menu.Item>
        </FriendsConditionalRendering>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserPopup;
