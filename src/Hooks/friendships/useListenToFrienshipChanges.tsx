import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Database } from "../../../types/database.types";

interface Props {
  getUserFriends?: () => Promise<void>;
}

const useListenToFriendshipChanges = ({ getUserFriends }: Props) => {
  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "friendships",
        },
        (payload) => {
          if (!getUserFriends) return;

          console.log(payload);

          getUserFriends();
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
