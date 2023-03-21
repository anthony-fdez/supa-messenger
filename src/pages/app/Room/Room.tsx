import React from "react";
import { useParams } from "react-router";
import useChatData from "../../../Hooks/useChatData";
import RoomNotFound from "./RoomNotFound/RoomNotFound";
import LoadingRoomData from "./LoadingRoomData/LoadingRoomData";

const Chat = (): JSX.Element => {
  const { chatId } = useParams();
  const { isLoading, roomNotFound, isRoomMember, roomData, roomParticipants } =
    useChatData({ roomId: chatId });

  if (true) return <LoadingRoomData />;
  if (roomNotFound) return <RoomNotFound />;

  return <h1>{chatId}</h1>;
};

export default Chat;
