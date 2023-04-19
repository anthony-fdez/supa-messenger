import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { Database } from "../../../../types/database.types";
import useGlobalStore from "../../../store/useGlobalStore";
import Messages from "./Messages/Messages";
import MessagesTextInput from "./MessagesTextInput/MessagesTextInput";
import RoomHeader from "./RoomHeader/RoomHeader";
import RoomSettingsDrawer from "./RoomHeader/RoomSettingsDrawer/RoomSettingsDrawer";
import useRoomStyles from "./useRoomStyles";
import useListenToRoomChanges from "../../../Hooks/rooms/useListenToRoomChanges";
import useTypingStatus from "../../../Hooks/rooms/useTypingStatus";
import JoinPublicRoom from "./JoinPublicRoom/JoinPublicRoom";
import useGetRoomMessages from "../../../Hooks/rooms/useGetRoomMessages";

interface Props {
  getRoomData: () => Promise<void>;
  roomId: string;
}

const Room = ({ roomId, getRoomData }: Props): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const { classes } = useRoomStyles();
  const {
    currentRoom: { roomData, isRoomMember },
  } = useGlobalStore();

  const { getRoomMessages } = useGetRoomMessages();

  const roomChannel = supabase.channel(roomId);

  useListenToRoomChanges({ getRoomData });
  useTypingStatus({ roomChannel });

  useEffect(() => {
    if (!roomData?.id) return;

    getRoomMessages({ roomId: roomData.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  return (
    <div>
      <div>
        <div className={classes.headerContainer}>
          <RoomHeader />
          {!isRoomMember && <JoinPublicRoom />}
        </div>
        <div className={classes.messagesContainer}>
          <Messages />
        </div>
        {isRoomMember && (
          <div className={classes.textInputContainer}>
            <MessagesTextInput roomChannel={roomChannel} />
          </div>
        )}
      </div>
      <div className={classes.desktopSideMenu}>
        <RoomSettingsDrawer isDrawer={false} />
      </div>
    </div>
  );
};

export default Room;
