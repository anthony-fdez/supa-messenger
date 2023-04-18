import { Alert, Button, Flex, Text, Title } from "@mantine/core";
import React from "react";
import { UserPlus, X } from "react-feather";
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

  const { isLoading, handleAcceptFriendRequest } = useHandleFriendsRequests();

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
                    mr={10}
                    size={16}
                  >
                    {friendData.name}
                  </Title>
                </Flex>
                <Text
                  c="dimmed"
                  size={14}
                >
                  {friendData.email}
                </Text>
              </div>
            </Flex>
            <Flex>
              <Button
                leftIcon={<X size={14} />}
                color="red"
                variant="light"
              >
                Decline
              </Button>

              <Button
                ml={10}
                onClick={() => {
                  handleAcceptFriendRequest({
                    friendData,
                    friendship,
                  });
                }}
                leftIcon={<UserPlus size={14} />}
                loading={isLoading}
              >
                Accept
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </div>
  );
};

export default FriendsRequestsList;
