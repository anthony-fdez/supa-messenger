import { ActionIcon, Alert, Flex, Loader, Menu, Title } from "@mantine/core";
import React from "react";
import { MoreHorizontal, Trash, UserPlus } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getFriend from "../../../utils/friendships/getFriend";
import UserPopup from "../../UserPopup/UserPopup";
import useHandleFriendsRequests from "../../../Hooks/friendships/useHandleFriendRequests";

const FriendsRequestsList = (): JSX.Element => {
  const {
    friendships: { requests },
    user: { uid },
  } = useGlobalStore();

  const { isLoading, handleAcceptFriendRequest, handleDeleteFriendship } =
    useHandleFriendsRequests();

  if (requests.length === 0) {
    return (
      <Alert title="No friend requests at the moment">
        <p>Go outside and make some friends or touch grass or something</p>
      </Alert>
    );
  }

  return (
    <div>
      {requests.map((friendship) => {
        const { friendData } = getFriend({
          friendship,
          userId: uid || "",
        });

        if (!friendData) return null;

        return (
          <Flex
            sx={{
              padding: 5,
              borderRadius: 5,
              cursor: "pointer",
            }}
            key={friendship.id}
            align="center"
            justify="space-between"
            mt={10}
          >
            <Flex>
              <UserPopup
                user={{
                  email: friendData.email || "",
                  id: friendData.id,
                  imageUrl: friendData.image_url || "",
                  name: friendData.name || "",
                }}
              >
                <UserAvatarWithIndicator
                  image={friendData.image_url || ""}
                  size={40}
                  user_email={friendData.email || ""}
                  checkOnline
                />
              </UserPopup>

              <div style={{ marginLeft: 10 }}>
                <Flex>
                  <Title
                    lineClamp={1}
                    mr={10}
                    size={16}
                  >
                    {friendData.name}
                  </Title>
                </Flex>
              </div>
            </Flex>
            <Menu
              shadow="md"
              width={200}
              position="bottom"
              withinPortal
              withArrow
            >
              <Menu.Target>
                <ActionIcon disabled={isLoading}>
                  {isLoading ? (
                    <Loader size={16} />
                  ) : (
                    <MoreHorizontal size={20} />
                  )}
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    handleAcceptFriendRequest({
                      friendData,
                      friendship,
                    });
                  }}
                  icon={<UserPlus size={16} />}
                >
                  Accept
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  onClick={() => {
                    handleDeleteFriendship({
                      friendship,
                    });
                  }}
                  icon={<Trash size={16} />}
                >
                  Decline Request
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
      })}
    </div>
  );
};

export default FriendsRequestsList;
