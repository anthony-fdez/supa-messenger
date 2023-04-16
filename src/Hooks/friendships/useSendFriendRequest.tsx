import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";

interface ISendFriendRequest {
  friendEmail: string;
  friendId: string;
}

const useSendFriendRequest = () => {
  const supabase = useSupabaseClient<Database>();
  const { user } = useGlobalStore();

  const [isLoading, setIsLoading] = useState(false);

  const sendFriendRequest = async ({
    friendId,
    friendEmail,
  }: ISendFriendRequest): Promise<void> => {
    setIsLoading(true);

    if (!user) return;
    if (!user.uid) return;

    const { error } = await supabase.from("friendships").insert({
      status: "PENDING",
      user_email_1: user.email,
      user_email_2: friendEmail,
      user_id_1: user.uid,
      user_id_2: friendId,
      action_user_id: user.uid,
    });

    if (error) {
      setIsLoading(false);
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });

      return;
    }

    showNotification({
      title: "Friend request sent successfully",
      message: "Now, its time to wait for them to accept it.",
    });

    setIsLoading(false);
  };

  return { isLoading, sendFriendRequest };
};

export default useSendFriendRequest;
