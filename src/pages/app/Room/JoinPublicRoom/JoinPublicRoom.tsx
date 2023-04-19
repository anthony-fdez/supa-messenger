import { Alert, Button, Text } from "@mantine/core";
import React, { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import useGlobalStore from "../../../../store/useGlobalStore";
import { Database } from "../../../../../types/database.types";

const JoinPublicRoom = () => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  const [isLoadingJoiningRoom, setIsLoadingJoiningRoom] = useState(false);

  const {
    currentRoom: { roomData, isRoomMember },
  } = useGlobalStore();

  const handleJoinRoom = async () => {
    if (!session) return;
    if (!roomData?.id) return;

    const { data, error } = await supabase
      .from("participants")
      .insert({
        user_id: session.user.id,
        room_id: roomData.id,
      })
      .select()
      .single();

    if (error || !data) {
      showNotification({
        title: "Error",
        message: "Unable to join room",
        color: "red",
      });
    }
  };

  if (isRoomMember) return null;

  return (
    <Alert
      variant="filled"
      mt={20}
      color="gray"
      title="Unleash Your Inner Comedian in this Chat Room"
    >
      <Text>
        Join our uproarious chat room for laughter-filled connections and
        side-splitting conversations with fellow humor enthusiasts. Don&apos;t
        miss out on the fun – hop in and let the good times roll!
      </Text>
      <Button
        mt={20}
        onClick={() => {
          setIsLoadingJoiningRoom(true);

          handleJoinRoom().finally(() => {
            setIsLoadingJoiningRoom(false);
          });
        }}
        loading={isLoadingJoiningRoom}
      >
        Join room
      </Button>
    </Alert>
  );
};

export default JoinPublicRoom;
