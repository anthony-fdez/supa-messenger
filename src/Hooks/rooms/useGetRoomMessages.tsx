import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";

interface IGetRoomMessages {
  roomId: number;
}

const useGetRoomMessages = () => {
  const supabase = useSupabaseClient<Database>();
  const {
    setCurrentRoom,
    currentRoom,
    user: { uid },
  } = useGlobalStore();

  const getRoomMessages = async ({
    roomId,
  }: IGetRoomMessages): Promise<void> => {
    const { data, error } = await supabase
      .from("messages")
      .select("*, userData:users(*)")
      .eq("room_id", roomId)
      .limit(50)
      .order("created_at", { ascending: false });

    if (error) {
      return showNotification({
        title: "Error",
        message: "Unable to get messages",
      });
    }

    const reversedMessages = data.reverse();

    const { error: lastReadError } = await supabase
      .from("participants")
      .update({
        last_message_read: reversedMessages[reversedMessages.length - 1].id,
      })
      .eq("room_id", currentRoom.roomData?.id)
      .eq("user_id", uid);

    if (lastReadError) {
      showNotification({
        title: "Error",
        message: "Unable to update last read message",
      });
    }

    return setCurrentRoom({
      messages: reversedMessages,
    });
  };

  return { getRoomMessages };
};

export default useGetRoomMessages;
