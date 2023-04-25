import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback, useEffect } from "react";
import useGlobalStore, {
  IDatabaseRoom,
  IFriend,
} from "../store/useGlobalStore";
import { Database } from "../../types/database.types";
import useHandleSignout from "./useHandleSignout";

const useLoadUserData = () => {
  const supabase = useSupabaseClient<Database>();
  const { handleSignout } = useHandleSignout();
  const session = useSession();

  const {
    setUser,
    setApp,
    setRooms,
    setFriendships,
    user: { uid },
    setDms,
  } = useGlobalStore();

  const getUserSession = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return handleSignout();

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getUserData = useCallback(async (): Promise<void> => {
    if (!session) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    if (error || !data) {
      setUser({
        name: null,
        email: null,
        imageUrl: null,
        registerComplete: false,
        uid: null,
      });

      return;
    }

    setUser({
      name: data?.name,
      email: data?.email,
      imageUrl: data?.image_url,
      registerComplete: data?.register_complete,
      uid: data?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getUserRoomData = useCallback(async (): Promise<void> => {
    if (!session) return;

    setRooms([]);
    setApp({ isLoadingRooms: true });

    const { data, error } = await supabase
      .from("rooms")
      .select(
        `*,
        friendships(
          *,
          userData1:users!friendships_user_id_1_fkey(
            *
          ),
          userData2:users!friendships_user_id_2_fkey(
            *
          ),
          actionUserData:users!friendships_action_user_id_fkey(
            *
          )
        ),
        participants!inner(
          *,
          userData:users(
            *
          )
        )
        `,
      )
      .filter("participants.user_id", "eq", uid);

    if (error || !data) {
      setApp({ isLoadingRooms: false });
      return;
    }

    const newDms: IDatabaseRoom[] = [];
    const newRooms: IDatabaseRoom[] = [];

    data.forEach((room) => {
      // @ts-ignore
      if (room.friendships && room.friendships[0] && room.is_dm) {
        newDms.push(room);
        return;
      }

      newRooms.push(room);
    });

    // @ts-ignore
    setRooms(newRooms);
    // @ts-ignore
    setDms(newDms);

    setTimeout(() => {
      setApp({ isLoadingRooms: false });
    }, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getUserFriends = useCallback(async (): Promise<void> => {
    if (!session) return;

    setFriendships({
      friends: [],
      requests: [],
      pending: [],
    });

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

    const requests: IFriend[] = [];
    const friends: IFriend[] = [];
    const pending: IFriend[] = [];

    if (error || !data) {
      return;
    }

    data.forEach((friendship) => {
      if (friendship.status === "PENDING") {
        if (friendship.action_user_id === uid) {
          pending.push(friendship);
        } else {
          requests.push(friendship);
        }
      } else if (friendship.status === "FRIENDS") {
        return friends.push(friendship);
      }

      return null;
    });

    setFriendships({
      friends,
      pending,
      requests,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    setApp({
      isLoading: true,
    });

    Promise.all([
      getUserData(),
      getUserRoomData(),
      getUserSession(),
      getUserFriends(),
    ]).finally(() => {
      // setApp({ isLoading: false });

      setApp({ isLoading: false });
    });
  }, [
    session,
    getUserData,
    getUserFriends,
    getUserRoomData,
    getUserSession,
    setApp,
    supabase,
  ]);

  return { getUserData, getUserRoomData, getUserSession, getUserFriends };
};

export default useLoadUserData;
