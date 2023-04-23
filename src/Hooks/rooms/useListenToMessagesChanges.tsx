import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";
import useGetRoomMessages from "./useGetRoomMessages";

interface Props {
  getRoomData?: () => Promise<void>;
}

const useListenToMessagesChanges = ({ getRoomData }: Props) => {
  const supabase = useSupabaseClient<Database>();
  const { getRoomMessages } = useGetRoomMessages();

  const {
    addNewCurrentRoomMessage,
    currentRoom: { roomData },
  } = useGlobalStore();

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
          event: "UPDATE",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // We only wanna fetch the new messages if we are currently in that room
          // we get every UPDATE on every message we are a part of here so if we are part
          // of a couple chats and people are editing messages, we would be fetching that data
          // even though we are not in that room at that time
          if (payload.new.room_id && payload.new.room_id === roomData?.id) {
            getRoomMessages({ roomId: payload.new.room_id });
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "participants",
        },
        () => {
          if (!getRoomData) return;

          getRoomData();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "participants",
        },
        () => {
          if (!getRoomData) return;

          getRoomData();
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useListenToMessagesChanges;
