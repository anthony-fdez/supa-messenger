import React from "react";
import { useParams } from "react-router";
import useChatData from "../../../Hooks/useChatData";
import RoomNotFound from "./RoomNotFound/RoomNotFound";
import LoadingRoomData from "./LoadingRoomData/LoadingRoomData";
import EnterRoomPassword from "./EnterRoomPassword/EnterRoomPassword";
import RoomHeader from "./RoomHeader/RoomHeader";
import useGlobalStore from "../../../store/useGlobalStore";

const Chat = (): JSX.Element => {
  const { chatId } = useParams();
  const { getRoomData } = useChatData({ roomId: chatId });

  const {
    currentRoom: { roomData, isLoading, roomNotFound, isRoomMember },
  } = useGlobalStore();

  if (isLoading) return <LoadingRoomData />;
  if (roomNotFound) return <RoomNotFound />;
  if (!isRoomMember && roomData?.is_private) {
    return (
      <EnterRoomPassword
        getRoomData={getRoomData}
        roomId={chatId}
      />
    );
  }

  return (
    <div>
      <RoomHeader />
    </div>
  );
};

export default Chat;
