import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import useGlobalStore from "../store/useGlobalStore";
import { Database } from "../../types/database.types";
import useHandleSignout from "./useHandleSignout";

const useLoadUserData = (): void => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const { handleSignout } = useHandleSignout();

  const { setUser, setApp, setRooms, setFriends } = useGlobalStore();

  useEffect(() => {
    if (!session) return;

    setApp({
      isLoading: true,
    });

    const getUserSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return handleSignout();

      return null;
    };

    const getUserData = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error || !data) {
        return setUser({
          name: null,
          email: null,
          imageUrl: null,
          registerComplete: false,
          uid: null,
        });
      }

      return setUser({
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
          participants!inner(
            *,
            userData:users(
              *
            )
          )`,
        )
        .filter("participants.user_id", "eq", session.user.id);

      if (error || !data) {
        return;
      }

      // @ts-ignore
      setRooms(data);
    };

    const getUserFriends = async (): Promise<void> => {
      setFriends([]);

      const { data, error } = await supabase.from("friendships").select(
        `*, 
          userData1:users!friendships_user_id_1_fkey(
            *
          ),
          userData2:users!friendships_user_id_2_fkey(
            *
          ),
          actionUserData:users!friendships_action_user_id_fkey(
            *
          )
        `,
      );

      if (error || !data) {
        return;
      }

      setFriends(data);
    };

    Promise.all([
      getUserData(),
      getUserRoomData(),
      getUserSession(),
      getUserFriends(),
    ]).finally(() => {
      // setApp({ isLoading: false });

      setApp({ isLoading: false });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, supabase]);
};

export default useLoadUserData;
