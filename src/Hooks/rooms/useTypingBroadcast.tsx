import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import useGlobalStore from "../../store/useGlobalStore";

interface Props {
  message: string;
  roomChannel: RealtimeChannel;
}

const useTypingBroadCast = ({ roomChannel, message }: Props) => {
  const { user } = useGlobalStore();

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (message.length >= 1) {
      return setIsTyping(true);
    }

    return setIsTyping(false);
  }, [message]);

  useEffect(() => {
    if (!user) return;
    if (roomChannel.state !== "joined") return;

    roomChannel.send({
      type: "broadcast",
      event: "typing",
      payload: {
        isTyping,
        email: user.email,
        name: user.name,
        uid: user.uid,
      },
    });
  }, [isTyping, roomChannel, user]);
};

export default useTypingBroadCast;
