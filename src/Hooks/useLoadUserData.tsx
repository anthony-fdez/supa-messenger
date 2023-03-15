import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import useGlobalStore from "../store/useGlobalStore";
import { Database } from "../types/database.types";

const useLoadUserData = (): void => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const { setUser, setApp, setRooms } = useGlobalStore();

  useEffect(() => {
    if (!session) return;

    setApp({
      isLoading: true,
    });

    const getUserData = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error || !data) {
        return;
      }

      setUser({
        name: data?.name,
        email: data?.email,
        imageUrl: data?.image_url,
        registerComplete: data?.register_complete,
        uid: data?.id,
      });
    };

    const getUserRoomData = async (): Promise<void> => {
      setRooms([]);

      const { data, error } = await supabase
        .from("rooms")
        .select(
          `*, 
        participants(
          *,
          users(
            *
          )
        )`,
        )
        .eq("participants.user_id", session.user.id);

      if (error || !data) {
        return;
      }

      // @ts-ignore
      setRooms(data);
    };

    getUserRoomData();

    getUserData().finally(() => {
      setTimeout(() => {
        setApp({ isLoading: false });
      }, 2000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, supabase]);
};

export default useLoadUserData;
