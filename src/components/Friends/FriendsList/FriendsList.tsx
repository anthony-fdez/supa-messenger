import { Alert, Flex, Text, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getFriend from "../../../utils/friendships/getFriend";
import UserPopup from "../../UserPopup/UserPopup";

const FriendsList = (): JSX.Element => {
  const {
    friendships: { friends },
    user,
  } = useGlobalStore();
  const theme = useMantineTheme();

  if (friends.length === 0) {
    return (
      <Alert title="No friends">
        <p>You must be feeling lonely</p>
      </Alert>
    );
  }

  return (
    <div>
      {friends.map((friendship) => {
        const { friendData } = getFriend({
          friendship,
          userId: user.uid || "",
        });

        if (!friendData) return null;

        return (
          <UserPopup
            user={{
              email: friendData.email || "",
              imageUrl: friendData.image_url || "",
              name: friendData.name || "",
              id: friendData.id || "",
            }}
          >
            <Flex
              sx={{
                padding: 5,
                borderRadius: 5,
                cursor: "pointer",
                ":hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[1],
                },
              }}
              key={friendship.id}
              align="center"
              mt={10}
            >
              <UserAvatarWithIndicator
                // @ts-ignore
                image={friendData.image_url}
                size={40}
                // @ts-ignore
                user_email={friendData.email}
                checkOnline
              />

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
          </UserPopup>
        );
      })}
    </div>
  );
};

export default FriendsList;
