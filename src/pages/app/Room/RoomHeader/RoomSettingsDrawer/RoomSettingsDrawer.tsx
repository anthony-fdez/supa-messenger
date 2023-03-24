import {
  Alert,
  Avatar,
  Button,
  Card,
  Divider,
  Drawer,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useSession } from "@supabase/auth-helpers-react";

import ChangeRoomNameForm from "./ChangeRoomNameForm/ChangeRoomNameForm";
import useGlobalStore from "../../../../../store/useGlobalStore";
import ChangeRoomPrivacy from "./ChangeRoomPrivacy/ChangeRoomPrivacy";

interface Props {
  isRoomSettingsOpened: boolean;
  setIsRoomSettingsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomSettingsDrawer = ({
  isRoomSettingsOpened,
  setIsRoomSettingsOpened,
}: Props): JSX.Element => {
  const session = useSession();

  const {
    currentRoom: { roomData, roomParticipants },
  } = useGlobalStore();

  const roomAdminSettings = (): JSX.Element | null => {
    if (session?.user.id !== roomData?.created_by) return null;

    return (
      <Card withBorder>
        <h3>Admin Settings</h3>
        <ChangeRoomNameForm />
        <Divider mt={20} />
        <ChangeRoomPrivacy />
        <Alert
          color="red"
          mt={20}
          title="Danger Zone"
        >
          <Button
            color="red"
            fullWidth
          >
            Delete Room
          </Button>
        </Alert>
      </Card>
    );
  };

  const renderRoomParticipants = (): JSX.Element => {
    if (!roomParticipants) {
      return (
        <Alert
          color="red"
          mt={10}
          title="Error"
        >
          <p>There was an error loading all the room participants.</p>
        </Alert>
      );
    }

    return (
      <>
        <Title
          mt={20}
          size={20}
        >
          Room Participants
        </Title>
        {roomParticipants.map((participant) => {
          if (!participant.userData) return null;

          return (
            <Flex
              key={participant.id}
              align="center"
              mt={10}
            >
              <Avatar
                radius="xl"
                // @ts-ignore
                src={participant.userData.image_url}
              />
              <div style={{ marginLeft: 10 }}>
                {/* @ts-ignore */}
                <Title size={16}>{participant.userData.name}</Title>
                <Text
                  c="dimmed"
                  size={14}
                >
                  {/* @ts-ignore */}
                  {participant.userData.email}
                </Text>
              </div>
            </Flex>
          );
        })}
      </>
    );
  };

  return (
    <Drawer
      keepMounted={false}
      onClose={(): void => setIsRoomSettingsOpened(false)}
      opened={isRoomSettingsOpened}
      overlayProps={{
        blur: 5,
      }}
      padding={20}
      position="right"
      size="md"
      title="Room Settings"
    >
      {roomAdminSettings()}
      {renderRoomParticipants()}
    </Drawer>
  );
};

export default RoomSettingsDrawer;
