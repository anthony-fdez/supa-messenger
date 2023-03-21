import React from "react";
import { Avatar, Title, Tooltip } from "@mantine/core";
import useRoomHeaderStyles from "./useRoomHeaderStyles";
import {
  IDatabaseParticipants,
  IDatabaseRoom,
} from "../../../../store/useGlobalStore";

interface Props {
  roomData: IDatabaseRoom | null;
  roomParticipants: IDatabaseParticipants[] | null;
}

const RoomHeader = ({ roomData, roomParticipants }: Props): JSX.Element => {
  const { classes, cx } = useRoomHeaderStyles();

  if (!roomData || !roomParticipants) {
    return <p>Error</p>;
  }

  return (
    <div className={classes.container}>
      <Title
        className={classes.title}
        lineClamp={1}
      >
        {roomData.name}
      </Title>
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
    </div>
  );
};

export default RoomHeader;
