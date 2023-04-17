import { Alert, Button, Flex, Text, Title } from "@mantine/core";
import React from "react";
import { UserPlus, X } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getFriend from "../../../utils/friendships/getFriend";
import UserPopup from "../../UserPopup/UserPopup";

const FriendsRequestsList = (): JSX.Element => {
  const {
    friendships: { requests },
    user: { uid },
  } = useGlobalStore();

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
            <Button.Group>
              <Button
                leftIcon={<X size={14} />}
                color="red"
                variant="light"
              >
                Decline
              </Button>
              <Button leftIcon={<UserPlus size={14} />}>Accept</Button>
            </Button.Group>
          </Flex>
        );
      })}
    </div>
  );
};

export default FriendsRequestsList;
