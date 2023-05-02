import {
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Title,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { Settings } from "react-feather";
import UserAvatarWithIndicator from "../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";
import useGlobalStore from "../../../../store/useGlobalStore";
import RoomSettingsDrawer from "../RoomSideMenu/RoomSideMenu";
import useRoomHeaderStyles from "./useRoomHeaderStyles";
import getFriend from "../../../../utils/friendships/getFriend";

const RoomHeader = (): JSX.Element => {
  const { classes } = useRoomHeaderStyles();
  const {
    currentRoom: { roomData, roomParticipants },
    setApp,
    user: { uid },
  } = useGlobalStore();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  const [isRoomSettingsOpened, setIsRoomSettingsOpened] = useState(false);

  if (!roomData || !roomParticipants) {
    return <p>Error</p>;
  }

  const getRoomName = () => {
    if (!roomData.is_dm) {
      return roomData.name;
    }

    // @ts-ignore
    if (!roomData?.friendships) return "Direct Message";

    const friend = getFriend({
      // @ts-ignore
      friendship: roomData.friendships[0],
      userId: uid || "",
    });

    return friend.friendData?.name;
  };

  return (
    <div style={{ zIndex: "9999" }}>
      <RoomSettingsDrawer
        isRoomSettingsOpened={isRoomSettingsOpened}
        setIsRoomSettingsOpened={setIsRoomSettingsOpened}
      />
      <div className={classes.container}>
        <div className={classes.headerLeft}>
          <div className={classes.participants}>
            <Avatar.Group spacing="sm">
              {roomParticipants.slice(0, 3).map((participant) => {
                if (!participant.userData) return null;

                return (
                  <Tooltip
                    key={participant.id}
                    // @ts-ignore
                    label={participant.userData.name}
                    withArrow
                  >
                    <div>
                      <UserAvatarWithIndicator
                        // @ts-ignore
                        image={participant.userData.image_url}
                        size={40}
                        // @ts-ignore
                        user_email={participant.userData.email}
                      />
                    </div>
                  </Tooltip>
                );
              })}
              {roomParticipants.length > 3 && (
                <Avatar radius="xl">{`+${roomParticipants.length - 3}`}</Avatar>
              )}
            </Avatar.Group>
          </div>
          <Title
            lineClamp={1}
            size={20}
          >
            {getRoomName()}
          </Title>
        </div>
        <Flex align="center">
          <Tooltip
            withArrow
            label="Use AI tools to help you write your messages, or to be a menace to your friends."
          >
            <Button
              onClick={() => {
                setApp({
                  isTldrMenuOpen: true,
                });
              }}
              mr={10}
              variant="light"
            >
              ChatGPT
            </Button>
          </Tooltip>
          {isMobile && (
            <Tooltip
              label="Room Settings"
              withArrow
            >
              <ActionIcon
                color="blue"
                onClick={(): void => setIsRoomSettingsOpened(true)}
                size="xl"
              >
                <Settings size={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default RoomHeader;
