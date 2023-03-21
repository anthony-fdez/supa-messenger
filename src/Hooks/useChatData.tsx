import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/database.types";
import { IDatabaseParticipants } from "../store/useGlobalStore";

interface Props {
  roomId?: string;
}

const useChatData = ({ roomId }: Props) => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const [isLoading, setIsLoading] = useState(true);
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [isRoomMember, setIsRoomMember] = useState(false);
  const [roomData, setRoomData] = useState<
    Database["public"]["Tables"]["rooms"]["Row"] | null
  >(null);
  const [roomParticipants, setRoomParticipants] = useState<
    IDatabaseParticipants[] | null
  >(null);

  useEffect(() => {
    if (!session) return;
    if (!roomId) return;

    setIsLoading(true);

    const getRoomData = async () => {
      const { error: roomDataError, data: roomDataReq } = await supabase
        .from("rooms")
        .select("*, participants(*)")
        .eq("participants.user_id", session.user.id)
        .eq("id", roomId)
        .single();

      if (!roomDataReq || roomDataError) return setRoomNotFound(true);

      // @ts-ignore
      if (!roomDataReq.participants[0]) {
        setIsRoomMember(false);
        return setRoomData(roomDataReq);
      }

      const { data: participantsData, error: participantsError } =
        await supabase
          .from("participants")
          .select("*, userData:users(*)")
          .eq("room_id", roomDataReq.id);

      if (!participantsData || participantsError) {
        return setIsLoading(false);
      }

      setRoomParticipants(participantsData);
    };

    getRoomData().finally(() => {
      setIsLoading(false);
    });
  }, [roomId, supabase, session]);

  return { isLoading, roomNotFound, isRoomMember, roomData, roomParticipants };
};

export default useChatData;
