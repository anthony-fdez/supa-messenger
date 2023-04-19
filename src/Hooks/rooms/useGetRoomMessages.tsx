import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";

interface IGetRoomMessages {
  roomId: number;
}

const useGetRoomMessages = () => {
  const supabase = useSupabaseClient<Database>();
  const { setCurrentRoom } = useGlobalStore();

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

    return setCurrentRoom({
      messages: data,
    });
  };

  return { getRoomMessages };
};

export default useGetRoomMessages;
