import { Alert, Badge, Button, Flex, Text, Title } from "@mantine/core";
import React from "react";
import { X } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getFriend from "../../../utils/friendships/getFriend";
import UserPopup from "../../UserPopup/UserPopup";
import useHandleFriendsRequests from "../../../Hooks/friendships/useHandleFriendRequests";

const FriendsPendingList = (): JSX.Element => {
  const {
    friendships: { pending },
    user,
  } = useGlobalStore();

  const { isLoading, handleDeleteFriendship } = useHandleFriendsRequests();

  if (pending.length === 0) {
    return (
      <Alert title="No friends">
        <p>You must be feeling lonely</p>
      </Alert>
    );
  }

  return (
    <div>
      <Alert title="This are the requests that you have sent">
        And are still pending...
      </Alert>
      {pending.map((friendship) => {
        const { friendData, status } = getFriend({
          friendship,
          userId: user.uid || "",
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
                  // @ts-ignore
                  email: friendData.email,
                  // @ts-ignore
                  id: friendData.id,
                  // @ts-ignore
                  imageUrl: friendData.image_url,
                  // @ts-ignore
                  name: friendData.name,
                }}
              >
                <UserAvatarWithIndicator
                  // @ts-ignore
                  image={friendData.image_url}
                  size={40}
                  // @ts-ignore
                  user_email={friendData.email}
                  checkOnline
                />
              </UserPopup>

              <div style={{ marginLeft: 10 }}>
                <Flex>
                  <Title
                    mr={10}
                    size={16}
                  >
                    {/* @ts-ignore */}
                    {friendData.name}
                  </Title>
                  <Badge>{status}</Badge>
                </Flex>
                <Text
                  c="dimmed"
                  size={14}
                >
                  {/* @ts-ignore */}
                  {friendData.email}
                </Text>
              </div>
            </Flex>
            <Button
              color="red"
              variant="light"
              leftIcon={<X size={14} />}
              loading={isLoading}
              onClick={() => {
                handleDeleteFriendship({ friendship });
              }}
            >
              Cancel Request
            </Button>
          </Flex>
        );
      })}
    </div>
  );
};

export default FriendsPendingList;
