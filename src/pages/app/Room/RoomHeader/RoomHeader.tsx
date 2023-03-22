import React, { useState } from "react";
import { ActionIcon, Avatar, Title, Tooltip } from "@mantine/core";
import { Settings } from "react-feather";
import useRoomHeaderStyles from "./useRoomHeaderStyles";
import RoomSettingsDrawer from "./RoomSettingsDrawer/RoomSettingsDrawer";
import useGlobalStore from "../../../../store/useGlobalStore";

const RoomHeader = (): JSX.Element => {
  const { classes } = useRoomHeaderStyles();
  const {
    currentRoom: { roomData, roomParticipants },
  } = useGlobalStore();

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
                    // @ts-ignore
                    label={participant.userData.name}
                    withArrow
                  >
                    <Avatar
                      radius="xl"
                      size="md"
                      // @ts-ignore
                      src={participant.userData.image_url}
                    />
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
        </div>
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
      </div>
    </>
  );
};

export default RoomHeader;
