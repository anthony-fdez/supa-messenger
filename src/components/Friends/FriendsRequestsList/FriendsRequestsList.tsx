import { Alert, Flex, Text, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getFriend from "../../../utils/friendships/getFriend";

const FriendsRequestsList = (): JSX.Element => {
  const {
    friendships: { requests },
    user: { uid },
  } = useGlobalStore();
  const theme = useMantineTheme();

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
        );
      })}
    </div>
  );
};

export default FriendsRequestsList;
