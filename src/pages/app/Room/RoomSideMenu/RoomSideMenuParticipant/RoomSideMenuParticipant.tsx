import React from "react";
import {
  Badge,
  Flex,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import UserPopup from "../../../../../components/UserPopup/UserPopup";
import UserAvatarWithIndicator from "../../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";
import FriendsConditionalRendering from "../../../../../components/Friends/FriendsConditionalRendering/FriendsConditionalrendering";
import useGlobalStore, {
  IDatabaseParticipants,
} from "../../../../../store/useGlobalStore";

interface Props {
  participant: IDatabaseParticipants;
}

export const RoomSideMenuParticipant = ({ participant }: Props) => {
  const theme = useMantineTheme();

  const {
    currentRoom: { usersTyping },
  } = useGlobalStore();

  return (
    <UserPopup
      key={participant.id}
      user={{
        // @ts-ignore
        email: participant.userData.email,
        // @ts-ignore
        id: participant.userData.id,
        // @ts-ignore
        imageUrl: participant.userData.image_url,
        // @ts-ignore
        name: participant.userData.name,
      }}
    >
      <Flex
        sx={{
          padding: 5,
          borderRadius: 5,
          width: "100%",
          cursor: "pointer",
          ":hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
          },
        }}
        align="center"
        mt={10}
      >
        <UserAvatarWithIndicator
          // @ts-ignore
          image={participant.userData.image_url}
          size={40}
          // @ts-ignore
          user_email={participant.userData.email}
          checkOnline
        />

        <div style={{ marginLeft: 10 }}>
          <Flex>
            <Title
              lineClamp={1}
              size={16}
            >
              {/* @ts-ignore */}
              {participant.userData.name}
            </Title>
            <FriendsConditionalRendering
              renderIf="FRIENDS"
              // @ts-ignore
              userId={participant.userData.id}
            >
              <Badge ml={10}>Friends</Badge>
            </FriendsConditionalRendering>
          </Flex>
          {usersTyping &&
          usersTyping.find(
            // @ts-ignore
            (user) => user.uid === participant.userData.id,
          ) ? (
            <Loader variant="dots" />
          ) : (
            <Text
              c="dimmed"
              size={14}
              lineClamp={1}
            >
              {/* @ts-ignore */}
              {participant.userData.email}
            </Text>
          )}
        </div>
      </Flex>
    </UserPopup>
  );
};

export default RoomSideMenuParticipant;
