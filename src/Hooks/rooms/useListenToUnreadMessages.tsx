import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Database } from "../../../types/database.types";
import useLoadUnreadMessages from "./useLoadUnreadMessages";

const useListenToUnreadMessagesChanges = () => {
  const supabase = useSupabaseClient<Database>();
  const { getUnreadMessages } = useLoadUnreadMessages();

  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes-unread-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        () => {
          getUnreadMessages();
        },
      )

      .subscribe();

    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useListenToUnreadMessagesChanges;
