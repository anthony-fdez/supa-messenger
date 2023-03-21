import React from "react";
import { useParams } from "react-router";
import useChatData from "../../../Hooks/useChatData";
import RoomNotFound from "./RoomNotFound/RoomNotFound";
import LoadingRoomData from "./LoadingRoomData/LoadingRoomData";
import EnterRoomPassword from "./EnterRoomPassword/EnterRoomPassword";

const Chat = (): JSX.Element => {
  const { chatId } = useParams();
  const {
    isLoading,
    roomNotFound,
    isRoomMember,
    roomData,
    roomParticipants,
    getRoomData,
  } = useChatData({ roomId: chatId });

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

  return <h1>{roomData?.name}</h1>;
};

export default Chat;
