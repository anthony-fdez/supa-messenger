import React from "react";

const RoomNotFound = (): JSX.Element => {
  return (
    <div>
      <h1>Room not found</h1>
      <p>
        The room you are trying to access does not exist or it may have been
        deleted.
      </p>
    </div>
  );
};

export default RoomNotFound;
