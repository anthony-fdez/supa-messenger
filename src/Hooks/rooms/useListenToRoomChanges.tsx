import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";
import { IGetRoomData } from "./useChatData";

interface Props {
  getRoomData?: ({ silent }: IGetRoomData) => Promise<void>;
}

const useListenToRoomChanges = ({ getRoomData }: Props) => {
  const supabase = useSupabaseClient<Database>();

  const { addNewCurrentRoomMessage } = useGlobalStore();

  useEffect(() => {
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // @ts-ignore
          addNewCurrentRoomMessage({ newMessage: payload.new, supabase });
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "participants",
        },
        () => {
          if (!getRoomData) return;

          getRoomData({ silent: true });
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
