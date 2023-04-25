import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";

interface Props {
  getUserFriends?: () => Promise<void>;
  getUserRoomData?: () => Promise<void>;
}

const useListenToFriendshipChanges = ({
  getUserFriends,
  getUserRoomData,
}: Props) => {
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
          if (getUserRoomData) getUserRoomData();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "friendships",
        },
        (payload) => {
          if (
            payload.new.status === "FRIENDS" &&
            payload.new.action_user_id !== uid
          ) {
            showNotification({
              title: "You got a new friend!",
              message:
                "Someone just accepted your friend request, go check out who it is",
            });
          }

          if (getUserFriends) getUserFriends();
          if (getUserRoomData) getUserRoomData();
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
