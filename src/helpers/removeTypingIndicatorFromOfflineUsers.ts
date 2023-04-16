import { RealtimePresenceState } from "@supabase/supabase-js";
import { ICurrentRoom, IUsersTyping } from "../store/useGlobalStore";

interface Props {
  onlineUsers: RealtimePresenceState;
  setCurrentRoom: (state: Partial<ICurrentRoom>) => void;
  usersTyping: IUsersTyping[];
}

const removeTypingIndicatorFromOfflineUsers = ({
  usersTyping,
  onlineUsers,
  setCurrentRoom,
}: Props) => {
  if (!onlineUsers) return;
  if (!usersTyping) return;

  const onlineUsersArr = Object.keys(onlineUsers);
  const newUsersTyping = usersTyping;

  const removed = newUsersTyping.filter((user) => {
    return onlineUsersArr.includes(user.email);
  });

  setCurrentRoom({
    usersTyping: removed,
  });
};

export default removeTypingIndicatorFromOfflineUsers;
