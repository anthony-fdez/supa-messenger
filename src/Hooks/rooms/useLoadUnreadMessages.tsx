import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback } from "react";
import { showNotification } from "@mantine/notifications";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";

const useLoadUnreadMessages = () => {
  const { setUnreadMessages } = useGlobalStore();

  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  const getUnreadMessages = useCallback(async (): Promise<void> => {
    if (!session) return;

    const { data, error } = await supabase.rpc("get_message_count", {
      p_user_id: session.user.id,
    });

    if (error || !data) {
      showNotification({
        title: "Error",
        message: "Unable to get unread messages",
      });
      return;
    }

    setUnreadMessages(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return { getUnreadMessages };
};

export default useLoadUnreadMessages;
