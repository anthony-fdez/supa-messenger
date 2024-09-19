import { Alert, Button } from "@mantine/core";
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
    preferences: { uiColor },
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
      color={uiColor}
      title="Want to participate in the fun?"
    >
      <Button
        variant="white"
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
