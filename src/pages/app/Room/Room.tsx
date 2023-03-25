import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { Database } from "../../../../types/database.types";
import useGlobalStore from "../../../store/useGlobalStore";
import MessagesTextInput from "./MessagesTextInput/MessagesTextInput";
import RoomHeader from "./RoomHeader/RoomHeader";
import useRoomStyles from "./useRoomStyles";
import Messages from "./Messages/Messages";
import RoomSettingsDrawer from "./RoomHeader/RoomSettingsDrawer/RoomSettingsDrawer";

const Room = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const { classes } = useRoomStyles();

  const {
    currentRoom: { roomData },
    setCurrentRoom,
    addNewCurrentRoomMessage,
  } = useGlobalStore();

  // @ts-ignore
  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // @ts-ignore
          addNewCurrentRoomMessage({ newMessage: payload.new, supabase });
        },
      )
      .subscribe();

    return () => channel.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getRoomData = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("messages")
        .select("*, userData:users(*)")
        .eq("room_id", roomData?.id)
        .limit(50);

      if (error) {
        return showNotification({
          title: "Error",
          message: "Unable to get messages",
        });
      }

      return setCurrentRoom({
        messages: data,
      });
    };

    getRoomData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.headerContainer}>
          <RoomHeader />
        </div>
        <div className={classes.messagesContainer}>
          <Messages />
        </div>
        <div className={classes.textInputContainer}>
          <MessagesTextInput />
        </div>
      </div>
      <div className={classes.desktopSideMenu}>
        <RoomSettingsDrawer isDrawer={false} />
      </div>
    </div>
  );
};

export default Room;
