import {
  Alert,
  Badge,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getFriend from "../../../utils/friendships/getFriend";

const FriendsPendingList = (): JSX.Element => {
  const {
    friendships: { pending },
    user,
  } = useGlobalStore();
  const theme = useMantineTheme();

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
        );
      })}
    </div>
  );
};

export default FriendsPendingList;
