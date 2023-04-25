import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { Database } from "../../../../types/database.types";
import useGlobalStore from "../../../store/useGlobalStore";
import Messages from "./Messages/Messages";
import MessagesTextInput from "./MessagesTextInput/MessagesTextInput";
import RoomHeader from "./RoomHeader/RoomHeader";
import RoomSettingsDrawer from "./RoomSideMenu/RoomSideMenu";
import useRoomStyles from "./useRoomStyles";
import useListenToMessagesChanges from "../../../Hooks/rooms/useListenToMessagesChanges";
import useTypingStatus from "../../../Hooks/rooms/useTypingStatus";
import JoinPublicRoom from "./JoinPublicRoom/JoinPublicRoom";
import useGetRoomMessages from "../../../Hooks/rooms/useGetRoomMessages";
import useLoadUnreadMessages from "../../../Hooks/rooms/useLoadUnreadMessages";

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
  const { getUnreadMessages } = useLoadUnreadMessages();

  const roomChannel = supabase.channel(roomId);

  useListenToMessagesChanges({ getRoomData });
  useTypingStatus({ roomChannel });

  useEffect(() => {
    if (!roomData?.id) return;

    const fetchData = async () => {
      getRoomMessages({ roomId: roomData.id });
      await getUnreadMessages();
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  return (
    <div>
      <div>
        <div className={classes.headerContainer}>
          <RoomHeader />
        </div>
        <div className={classes.messagesContainer}>
          {!isRoomMember && (
            <div className={classes.join_room_container}>
              <JoinPublicRoom />
            </div>
          )}

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
