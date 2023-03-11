import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import useGlobalStore from "../store/useGlobalStore";
import { Database } from "../types/database.types";

const useLoadUserData = (): void => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const { setUser } = useGlobalStore();

  useEffect(() => {
    if (!session) return;

    const getUserData = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error || !data) {
        showNotification({
          title: "Error",
          message: "Unable to get user data.",
        });
      }

      setUser({
        name: data?.name,
        email: data?.email,
        imageUrl: data?.image_url,
        registerComplete: data?.register_complete,
        uid: data?.id,
      });
    };

    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, supabase]);
};

export default useLoadUserData;
