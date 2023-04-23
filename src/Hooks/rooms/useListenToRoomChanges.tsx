import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Database } from "../../../types/database.types";

interface Props {
  getUserRoomData?: () => Promise<void>;
}

const useListenToRoomChanges = ({ getUserRoomData }: Props) => {
  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel("rooms-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rooms",
        },
        () => {
          if (getUserRoomData) getUserRoomData();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "rooms",
        },
        () => {
          if (getUserRoomData) getUserRoomData();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
        },
        () => {
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

export default useListenToRoomChanges;
