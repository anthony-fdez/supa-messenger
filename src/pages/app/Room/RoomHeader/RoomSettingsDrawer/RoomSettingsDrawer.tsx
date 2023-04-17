import {
  Alert,
  Badge,
  Button,
  Card,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

import { useMediaQuery } from "@mantine/hooks";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Settings } from "react-feather";
import { useNavigate } from "react-router";
import { Database } from "../../../../../../types/database.types";
import FriendsConditionalRendering from "../../../../../components/Friends/FriendsConditionalRendering/FriendsConditionalrendering";
import UserAvatarWithIndicator from "../../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";
import useGlobalStore from "../../../../../store/useGlobalStore";
import ChangeRoomNameForm from "./ChangeRoomNameForm/ChangeRoomNameForm";
import ChangeRoomPrivacy from "./ChangeRoomPrivacy/ChangeRoomPrivacy";
import UserPopup from "../../../../../components/UserPopup/UserPopup";

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
  const supabase = useSupabaseClient<Database>();
  const theme = useMantineTheme();

  const {
    setCurrentRoom,
    rooms,
    setRooms,
    currentRoom: { roomData, roomParticipants },
  } = useGlobalStore();

  const removeRoom = (id: number) => {
    const removeRoomAsync = async (): Promise<void> => {
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

      const oldRooms = rooms;

      const newRoomsWithRoomRemoved = oldRooms.filter((el) => {
        return el.id !== id;
      });

      setRooms(newRoomsWithRoomRemoved);

      setCurrentRoom({
        isLoading: false,
        isRoomMember: false,
        roomData: null,
        roomNotFound: false,
        roomParticipants: null,
        messages: null,
      });
      return navigate("/");
    };

    removeRoomAsync().finally(() => {
      closeAllModals();
    });
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
                onClick={() => {
                  openModal({
                    title: "Are you sure bitch",
                    overlayProps: {
                      blur: 5,
                    },
                    children: (
                      <Flex justify="flex-end">
                        <Button
                          color="gray"
                          mr={10}
                          onClick={() => closeAllModals()}
                          variant="subtle"
                        >
                          Cancel
                        </Button>
                        <Button
                          color="red"
                          onClick={() => {
                            if (roomData?.id) {
                              removeRoom(roomData.id);
                            }
                          }}
                        >
                          Delete that bitch
                        </Button>
                      </Flex>
                    ),
                  });
                }}
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
            <UserPopup
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
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[1],
                  },
                }}
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
                  checkOnline
                />

                <div style={{ marginLeft: 10 }}>
                  <Flex>
                    {/* @ts-ignore */}
                    <Title size={16}>{participant.userData.name}</Title>
                    <FriendsConditionalRendering
                      // @ts-ignore
                      userId={participant.userData.id}
                    >
                      <Badge ml={10}>Friends</Badge>
                    </FriendsConditionalRendering>
                  </Flex>

                  <Text
                    c="dimmed"
                    size={14}
                  >
                    {/* @ts-ignore */}
                    {participant.userData.email}
                  </Text>
                </div>
              </Flex>
            </UserPopup>
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
