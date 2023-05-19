import {
  Session,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Database } from "../../../types/database.types";

interface Props {
  getUserRoomData?: (session: Session) => Promise<void>;
}

const useListenToRoomChanges = ({ getUserRoomData }: Props) => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel("rooms-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rooms",
        },
        async () => {
          if (getUserRoomData) await getUserRoomData(session);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "rooms",
        },
        async () => {
          if (getUserRoomData) await getUserRoomData(session);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
        },
        async () => {
          if (getUserRoomData) await getUserRoomData(session);
        },
      )
      .subscribe();

    // eslint-disable-next-line consistent-return
    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
};

export default useListenToRoomChanges;
