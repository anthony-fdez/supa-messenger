import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../types/database.types";

interface Props {
  roomId?: string;
}

const useChatData = ({ roomId }: Props) => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  console.log(roomId);

  const [isLoading, setIsLoading] = useState(true);
  const [isRoomMember, setIsRoomMember] = useState(false);
  const [roomData, setRoomData] = useState<
    Database["public"]["Tables"]["rooms"]["Row"] | null
  >(null);

  useEffect(() => {
    if (!session) return;
    if (!roomId) return;

    const getRoomData = async () => {
      const { error, data } = await supabase
        .from("rooms")
        .select("*, participants!inner(*)")
        .eq("participants.user_id", session.user.id)
        .eq("id", roomId)
        .single();

      console.log(error);
      console.log(data);
    };

    getRoomData().finally(() => {
      setIsLoading(false);
    });
  }, []);
};

export default useChatData;
