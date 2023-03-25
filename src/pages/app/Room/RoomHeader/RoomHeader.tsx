import React, { useState } from "react";
import { ActionIcon, Avatar, Badge, Title, Tooltip } from "@mantine/core";
import { Settings } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import useRoomHeaderStyles from "./useRoomHeaderStyles";
import RoomSettingsDrawer from "./RoomSettingsDrawer/RoomSettingsDrawer";
import useGlobalStore from "../../../../store/useGlobalStore";
import UserAvatarWithIndicator from "../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";

const RoomHeader = (): JSX.Element => {
  const { classes } = useRoomHeaderStyles();
  const {
    currentRoom: { roomData, roomParticipants },
  } = useGlobalStore();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  const [isRoomSettingsOpened, setIsRoomSettingsOpened] = useState(false);

  if (!roomData || !roomParticipants) {
    return <p>Error</p>;
  }

  return (
    <>
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
            {roomData.name}
          </Title>
          {roomData.is_private ? (
            <Badge
              ml={30}
              mt={3}
              variant="outline"
            >
              Private Room
            </Badge>
          ) : (
            <Badge
              color="red"
              ml={30}
              mt={3}
              variant="outline"
            >
              Public Room
            </Badge>
          )}
        </div>
        {isMobile && (
          <Tooltip
            label="Room Settings"
            withArrow
          >
            <ActionIcon
              color="green"
              onClick={(): void => setIsRoomSettingsOpened(true)}
              size="xl"
            >
              <Settings size={20} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
    </>
  );
};

export default RoomHeader;
