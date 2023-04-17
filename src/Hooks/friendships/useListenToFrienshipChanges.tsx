import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";

interface Props {
  getUserFriends?: () => Promise<void>;
}

const useListenToFriendshipChanges = ({ getUserFriends }: Props) => {
  const supabase = useSupabaseClient<Database>();

  const {
    user: { uid },
  } = useGlobalStore();

  useEffect(() => {
    const channel = supabase
      .channel("friendships-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "friendships",
        },
        (payload) => {
          if (
            payload.new.status === "PENDING" &&
            payload.new.action_user_id !== uid
          ) {
            showNotification({
              title: "Yoo",
              message: "You just got a friend request",
            });
          }

          if (getUserFriends) getUserFriends();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "friendships",
        },
        () => {
          if (getUserFriends) getUserFriends();
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useListenToFriendshipChanges;
