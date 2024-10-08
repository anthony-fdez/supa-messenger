import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  Flex,
  ScrollArea,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";

import { useMediaQuery } from "@mantine/hooks";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import {
  Lock,
  LogOut,
  Settings,
  Smile,
  ThumbsDown,
  Unlock,
} from "react-feather";
import { useNavigate } from "react-router";
import { Database } from "../../../../../types/database.types";
import useGlobalStore from "../../../../store/useGlobalStore";
import ChangeRoomNameForm from "./ChangeRoomNameForm/ChangeRoomNameForm";
import ChangeRoomPrivacy from "./ChangeRoomPrivacy/ChangeRoomPrivacy";
// eslint-disable-next-line import/no-named-as-default
import RoomSideMenuParticipant from "./RoomSideMenuParticipant/RoomSideMenuParticipant";
import useRoomSideMenuStyles from "./useRoomSideMenuStyles";

interface Props {
  isDrawer?: boolean;
  isRoomSettingsOpened?: boolean;
  setIsRoomSettingsOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomSideMenu = ({
  isRoomSettingsOpened,
  setIsRoomSettingsOpened,
  isDrawer = true,
}: Props): JSX.Element | null => {
  const { classes } = useRoomSideMenuStyles();

  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const {
    setCurrentRoom,
    rooms,
    setRooms,
    currentRoom: { roomData, roomParticipants, isRoomMember },
  } = useGlobalStore();

  const removeRoom = (id: string) => {
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
        usersTyping: [],
      });
      return navigate("/");
    };

    removeRoomAsync().finally(() => {
      closeAllModals();
    });
  };

  const handleLeaveRoom = (): void => {
    const leaveRoomAsync = async (): Promise<void | null> => {
      if (!roomData?.id || !session?.user.id) {
        return showNotification({
          title: "Error",
          message: "Unauthorized",
        });
      }

      const { error } = await supabase
        .from("participants")
        .delete()
        .eq("room_id", roomData.id)
        .eq("user_id", session.user.id);

      if (error) {
        return showNotification({
          title: "Error",
          message: "error",
        });
      }

      return null;
    };

    openModal({
      overlayProps: {
        blur: 5,
      },
      title: "Are you sure you want to leave this room?",
      children: (
        <Flex justify="flex-end">
          <Button
            onClick={() => {
              closeAllModals();
            }}
            variant="light"
            color="gray"
            leftIcon={<Smile size={14} />}
          >
            No, I like it here
          </Button>
          <Button
            color="red"
            onClick={() => {
              leaveRoomAsync().finally(() => {
                closeAllModals();
              });
            }}
            ml={10}
            leftIcon={<ThumbsDown size={14} />}
          >
            Yes, this room sucks
          </Button>
        </Flex>
      ),
    });
  };

  const getRoomBadge = (): JSX.Element | null => {
    if (!roomData) return null;

    if (roomData.is_dm) {
      return (
        <Tooltip
          withArrow
          withinPortal
          label="Direct Message"
        >
          <ThemeIcon
            p={5}
            mr={10}
            color="blue"
            variant="outline"
          >
            <Lock size={16} />
          </ThemeIcon>
        </Tooltip>
      );
    }

    if (roomData.is_private) {
      return (
        <Tooltip
          withArrow
          withinPortal
          label="Private Room"
        >
          <ThemeIcon
            p={5}
            mr={10}
            color="green"
            variant="outline"
          >
            <Lock size={16} />
          </ThemeIcon>
        </Tooltip>
      );
    }

    return (
      <Tooltip
        withArrow
        withinPortal
        label="Public Room"
      >
        <ThemeIcon
          p={5}
          mr={10}
          color="red"
          variant="outline"
        >
          <Unlock size={16} />
        </ThemeIcon>
      </Tooltip>
    );
  };

  const isMobile = useMediaQuery("(max-width: 1200px)");

  const roomAdminSettings = (): JSX.Element | null => {
    if (session?.user.id !== roomData?.created_by) return null;

    return (
      <Button
        sx={{ position: "sticky", top: 0, zIndex: 20 }}
        fullWidth
        leftIcon={<Settings size={16} />}
        mb={20}
        onClick={(): void => {
          openModal({
            title: "Room Admin Settings",
            overlayProps: {
              blur: 5,
            },
            zIndex: 999,
            children: (
              <>
                <ChangeRoomNameForm />
                <Divider mt={20} />
                <ChangeRoomPrivacy />
                <Alert
                  color="red"
                  mt={20}
                  title="Danger Zone"
                >
                  Every message in this room will be deleted, all the
                  participants in the room will be removed and this action
                  cannot be recovered.
                  <Button
                    mt={20}
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
                                  closeAllModals();
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
              </>
            ),
          });
        }}
      >
        Room Admin Settings
      </Button>
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
      <div className={classes.container}>
        <ScrollArea
          w={360}
          h="100%"
        >
          <Box
            sx={{ overflow: "hidden" }}
            w={360}
          >
            {roomAdminSettings()}
            <Flex align="center">
              {getRoomBadge()}
              <Title
                lineClamp={1}
                size={26}
              >
                {roomData?.name}
              </Title>
            </Flex>
            {roomParticipants.map((participant) => {
              if (!participant.userData) return null;

              return (
                <RoomSideMenuParticipant
                  key={participant.id}
                  participant={participant}
                />
              );
            })}
          </Box>
        </ScrollArea>
        {isRoomMember &&
          roomData?.created_by !== session?.user.id &&
          !roomData?.is_dm && (
            <Button
              w={360}
              onClick={handleLeaveRoom}
              fullWidth
              variant="light"
              color="red"
              leftIcon={<LogOut size={14} />}
            >
              Leave Room
            </Button>
          )}
      </div>
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
        {renderRoomParticipants()}
      </Drawer>
    );
  }

  if (!isMobile && isDrawer) return null;

  return <div>{renderRoomParticipants()}</div>;
};

export default RoomSideMenu;
