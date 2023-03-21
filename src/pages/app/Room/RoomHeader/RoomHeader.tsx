import React from "react";
import { ActionIcon, Avatar, Title, Tooltip } from "@mantine/core";
import useRoomHeaderStyles from "./useRoomHeaderStyles";
import {
  IDatabaseParticipants,
  IDatabaseRoom,
} from "../../../../store/useGlobalStore";
import { Settings, Tool } from "react-feather";

interface Props {
  roomData: IDatabaseRoom | null;
  roomParticipants: IDatabaseParticipants[] | null;
}

const RoomHeader = ({ roomData, roomParticipants }: Props): JSX.Element => {
  const { classes } = useRoomHeaderStyles();

  if (!roomData || !roomParticipants) {
    return <p>Error</p>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.headerLeft}>
        <div className={classes.participants}>
          <Avatar.Group spacing="sm">
            {roomParticipants.slice(0, 5).map((participant) => {
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
            {roomParticipants.length > 5 && (
              <Avatar radius="xl">{`+${roomParticipants.length - 5}`}</Avatar>
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
          size="xl"
        >
          <Settings size={20} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

export default RoomHeader;
