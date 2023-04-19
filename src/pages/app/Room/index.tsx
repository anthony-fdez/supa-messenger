import { useParams } from "react-router";
import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import EnterRoomPassword from "./EnterRoomPassword/EnterRoomPassword";
import LoadingRoomData from "./LoadingRoomData/LoadingRoomData";
import Room from "./Room";
import RoomNotFound from "./RoomNotFound/RoomNotFound";
import useRoomData from "../../../Hooks/rooms/useRoomData";

const RoomIndex = (): JSX.Element => {
  const { roomId } = useParams();
  const { getRoomData } = useRoomData({ roomId });

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

  return (
    <Room
      roomId={roomId}
      getRoomData={getRoomData}
    />
  );
};

export default RoomIndex;
