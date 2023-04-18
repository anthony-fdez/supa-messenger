import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { Database } from "../../../types/database.types";
import useGlobalStore, {
  IDatabaseUser,
  IFriend,
} from "../../store/useGlobalStore";

interface IAcceptFriendRequest {
  friendData: IDatabaseUser;
  friendship: IFriend;
}

const useHandleFriendsRequests = () => {
  const supabase = useSupabaseClient<Database>();
  const { user } = useGlobalStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptFriendRequest = async ({
    friendData,
    friendship,
  }: IAcceptFriendRequest): Promise<void> => {
    setIsLoading(true);

    if (!user) return;
    if (!user.uid) return;

    const { error } = await supabase
      .from("friendships")
      .update({
        status: "FRIENDS",
        action_user_id: user.uid,
        id: friendship.id,
      })
      .eq("id", friendship.id);

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
      title: "You got a new friends",
      message: `You and ${friendData.name} are now friends! Now you can go outside and touch grass together`,
    });

    setIsLoading(false);
  };

  return { isLoading, handleAcceptFriendRequest };
};

export default useHandleFriendsRequests;
