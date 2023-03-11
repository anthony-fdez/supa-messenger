import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import useGlobalStore from "../store/useGlobalStore";
import { Database } from "../types/database.types";

const useLoadUserData = (): void => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const { setUser, setApp } = useGlobalStore();

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
        showNotification({
          title: "Error",
          message: "Unable to get user data.",
        });
      }

      console.log(data);

      setUser({
        name: data?.name,
        email: data?.email,
        imageUrl: data?.image_url,
        registerComplete: data?.register_complete,
        uid: data?.id,
      });
    };

    getUserData().finally(() => {
      setTimeout(() => {
        setApp({ isLoading: false });
      }, 2000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, supabase]);
};

export default useLoadUserData;
