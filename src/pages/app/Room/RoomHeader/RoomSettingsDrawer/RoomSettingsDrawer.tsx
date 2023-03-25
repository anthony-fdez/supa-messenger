import {
  Alert,
  Button,
  Card,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { useMediaQuery } from "@mantine/hooks";
import { Settings } from "react-feather";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router";
import ChangeRoomNameForm from "./ChangeRoomNameForm/ChangeRoomNameForm";
import useGlobalStore from "../../../../../store/useGlobalStore";
import ChangeRoomPrivacy from "./ChangeRoomPrivacy/ChangeRoomPrivacy";
import UserAvatarWithIndicator from "../../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";
import { Database } from "../../../../../../types/database.types";

interface Props {
  isDrawer?: boolean;
  isRoomSettingsOpened?: boolean;
  setIsRoomSettingsOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomSettingsDrawer = ({
  isRoomSettingsOpened,
  setIsRoomSettingsOpened,
  isDrawer = true,
}: Props): JSX.Element | null => {
  const navigate = useNavigate();

  const session = useSession();
  const [isLoading, setLoading] = useState(false);
  const supabase = useSupabaseClient<Database>();

  const {
    setCurrentRoom,
    currentRoom: { roomData, roomParticipants },
  } = useGlobalStore();

  const removeRoom = (id: any) => {
    setLoading(true);

    const removeRoomAsync = async () => {
      if (!roomData?.id || !session?.user.id) {
        return showNotification({
          title: "Error",
          message: "Unauthorized",
        });
      }

      const { error } = await supabase.from("rooms").delete().eq("id", id);

      if (error) {
        return showNotification({
          title: "Error",
          message: "error",
        });
      }

      setCurrentRoom({
        isLoading: false,
        isRoomMember: false,
        roomData: null,
        roomNotFound: false,
        roomParticipants: null,
        messages: null,
      });

      navigate("/");
    };

    removeRoomAsync().finally(() => setLoading(false));
  };

  const isMobile = useMediaQuery("(max-width: 1200px)");

  const [showRoomSettings, setShowRoomSettings] = useState(false);

  const roomAdminSettings = (): JSX.Element | null => {
    if (session?.user.id !== roomData?.created_by) return null;

    return (
      <>
        <Button
          fullWidth
          leftIcon={<Settings size={16} />}
          mb={20}
          onClick={(): void => setShowRoomSettings(!showRoomSettings)}
        >
          Room Admin Settings
        </Button>
        <Collapse in={showRoomSettings}>
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
                loading={isLoading}
                onClick={() => removeRoom(roomData?.id)}
                type="submit"
              >
                Delete Room
              </Button>
            </Alert>
          </Card>
        </Collapse>
      </>
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
          People
        </Title>
        {roomParticipants.map((participant) => {
          if (!participant.userData) return null;

          return (
            <Flex
              key={participant.id}
              align="center"
              mt={10}
            >
              <UserAvatarWithIndicator
                // @ts-ignore
                image={participant.userData.image_url}
                size={40}
                // @ts-ignore
                user_email={participant.userData.email}
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

  if (isMobile) {
    if (!isRoomSettingsOpened || !setIsRoomSettingsOpened) return null;

    return (
      <Drawer
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
  }

  if (!isMobile && isDrawer) return null;

  return (
    <div>
      {roomAdminSettings()}
      {renderRoomParticipants()}
    </div>
  );
};

export default RoomSettingsDrawer;
