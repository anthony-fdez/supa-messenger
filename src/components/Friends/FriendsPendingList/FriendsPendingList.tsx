import { Alert, Badge, Button, Flex, Text, Title } from "@mantine/core";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { X } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getFriend from "../../../utils/friendships/getFriend";
import { Database } from "../../../../types/database.types";
import UserPopup from "../../UserPopup/UserPopup";

const FriendsPendingList = (): JSX.Element => {
  const {
    friendships: { pending },
    user,
  } = useGlobalStore();
  const supabase = useSupabaseClient<Database>();

  if (pending.length === 0) {
    return (
      <Alert title="No friends">
        <p>You must be feeling lonely</p>
      </Alert>
    );
  }

  const handleCancelFriendRequest = async (
    friendshipId: number,
  ): Promise<void | null> => {
    const { error } = await supabase
      .from("friendships")
      .delete()
      .eq("id", friendshipId);

    if (error) {
      return showNotification({
        title: "Error",
        message: "Unable to cancel your friend request at the moment",
      });
    }

    return null;
  };

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
              onClick={() => {
                handleCancelFriendRequest(friendship.id);
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
