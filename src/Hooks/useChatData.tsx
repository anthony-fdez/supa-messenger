import { useCallback, useEffect, useState } from "react";
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

  const getRoomData = useCallback(async (): Promise<void> => {
    if (!session) return;

    const { error: roomDataError, data: roomDataReq } = await supabase
      .from("rooms")
      .select("*, participants(*)")
      .eq("participants.user_id", session.user.id)
      .eq("id", roomId)
      .single();

    if (!roomDataReq || roomDataError) {
      setRoomNotFound(true);
      return;
    }

    setRoomData(roomDataReq);
    // @ts-ignore
    if (!roomDataReq.participants[0]) {
      setIsRoomMember(false);
      return;
    }

    const { data: participantsData, error: participantsError } = await supabase
      .from("participants")
      .select("*, userData:users(*)")
      .eq("room_id", roomDataReq.id);

    if (!participantsData || participantsError) {
      setIsLoading(false);
      return;
    }

    setRoomParticipants(participantsData);
    setIsRoomMember(true);
  }, [roomId, supabase, session]);

  useEffect(() => {
    if (!session) return;
    if (!roomId) return;

    setIsLoading(true);

    getRoomData().finally(() => {
      setIsLoading(false);
    });
  }, [roomId, session, getRoomData]);

  return {
    isLoading,
    roomNotFound,
    isRoomMember,
    roomData,
    roomParticipants,
    getRoomData,
  };
};

export default useChatData;
