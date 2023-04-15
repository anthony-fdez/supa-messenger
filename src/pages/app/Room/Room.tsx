import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { Database } from "../../../../types/database.types";
import useGlobalStore from "../../../store/useGlobalStore";
import Messages from "./Messages/Messages";
import MessagesTextInput from "./MessagesTextInput/MessagesTextInput";
import RoomHeader from "./RoomHeader/RoomHeader";
import RoomSettingsDrawer from "./RoomHeader/RoomSettingsDrawer/RoomSettingsDrawer";
import useRoomStyles from "./useRoomStyles";

interface Props {
  roomId: string;
}

const Room = ({ roomId }: Props): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const { classes } = useRoomStyles();
  const {
    currentRoom: { roomData },
    setCurrentRoom,
    addNewCurrentRoomMessage,
  } = useGlobalStore();

  const roomChannel = supabase.channel(roomId);

  roomChannel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      roomChannel.on("broadcast", { event: "typing" }, (payload) => {
        console.log(payload);
      });
    }
  });

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
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "rooms",
        },
        (payload) => {
          // @ts-ignore
          removeRoom({ room: payload.old, supabase });
        },
      )
      .subscribe();

    return () => channel.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!roomData?.id) return;

    const getRoomData = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("messages")
        .select("*, userData:users(*)")
        .eq("room_id", roomData.id)
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
  }, [roomData]);

  return (
    <div className={classes.container}>
      {/** @ts-ignore */}
      <div className={classes.content}>
        <div className={classes.headerContainer}>
          <RoomHeader />
        </div>
        <div className={classes.messagesContainer}>
          <Messages />
        </div>
        <div className={classes.textInputContainer}>
          <MessagesTextInput roomChannel={roomChannel} />
        </div>
      </div>
      <div className={classes.desktopSideMenu}>
        <RoomSettingsDrawer isDrawer={false} />
      </div>
    </div>
  );
};

export default Room;
