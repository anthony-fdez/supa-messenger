import { useParams } from "react-router";
import React from "react";
import useChatData from "../../../Hooks/useChatData";
import useGlobalStore from "../../../store/useGlobalStore";
import EnterRoomPassword from "./EnterRoomPassword/EnterRoomPassword";
import LoadingRoomData from "./LoadingRoomData/LoadingRoomData";
import Room from "./Room";
import RoomNotFound from "./RoomNotFound/RoomNotFound";

const RoomIndex = (): JSX.Element => {
  const { roomId } = useParams();
  const { getRoomData } = useChatData({ roomId });

  const {
    currentRoom: { roomData, isLoading, roomNotFound, isRoomMember },
  } = useGlobalStore();

  if (isLoading) return <LoadingRoomData />;
  if (roomNotFound) return <RoomNotFound />;
  if (!isRoomMember && roomData?.is_private) {
    return (
      <EnterRoomPassword
        getRoomData={getRoomData}
        roomId={roomId}
      />
    );
  }

  if (!roomId) return <p>Error: roomId not found</p>;

  return <Room roomId={roomId} />;
};

export default RoomIndex;
