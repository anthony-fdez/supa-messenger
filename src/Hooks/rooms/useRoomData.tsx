import { useCallback, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";

interface Props {
  roomId?: string;
}

const useRoomData = ({ roomId }: Props) => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const { setCurrentRoom } = useGlobalStore();

  const getRoomData = useCallback(
    async (): Promise<void> => {
      if (!session) return;

      setCurrentRoom({
        isLoading: true,
        isRoomMember: false,
        roomNotFound: false,
        roomParticipants: null,
        messages: null,
        usersTyping: [],
      });

      const { error: roomDataError, data: roomDataReq } = await supabase
        .from("rooms")
        .select(
          `*, participants(*), friendships(*,  userData1:users!friendships_user_id_1_fkey(
          *
        ),
        userData2:users!friendships_user_id_2_fkey(
          *
        ),
        actionUserData:users!friendships_action_user_id_fkey(
          *
        ))`,
        )
        .eq("participants.user_id", session.user.id)
        .eq("id", roomId || "")
        .single();

      if (!roomDataReq || roomDataError) {
        setCurrentRoom({ roomNotFound: true, isLoading: false });
        return;
      }

      setCurrentRoom({ roomData: roomDataReq });

      const { data: participantsData, error: participantsError } =
        await supabase
          .from("participants")
          .select("*, userData:users(*)")
          .eq("room_id", roomDataReq.id);

      if (!participantsData || participantsError) {
        setCurrentRoom({ isLoading: false });

        return;
      }

      // @ts-ignore
      if (!roomDataReq.participants[0]) {
        setCurrentRoom({
          isRoomMember: false,
          roomParticipants: participantsData,
          isLoading: false,
        });

        return;
      }

      setCurrentRoom({
        roomParticipants: participantsData,
        isRoomMember: true,
        isLoading: false,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roomId, supabase, session],
  );

  useEffect(() => {
    if (!session) return;
    if (!roomId) return;

    setCurrentRoom({ isLoading: true });

    getRoomData().finally(() => {
      setCurrentRoom({ isLoading: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, session, getRoomData]);

  return {
    getRoomData,
  };
};

export default useRoomData;
