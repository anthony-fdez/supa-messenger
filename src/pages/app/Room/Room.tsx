import React, { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { RealtimeChannel, RealtimePresenceState } from "@supabase/supabase-js";
import MessagesTextInput from "./MessagesTextInput/MessagesTextInput";
import RoomHeader from "./RoomHeader/RoomHeader";
import useRoomStyles from "./useRoomStyles";
import useGlobalStore from "../../../store/useGlobalStore";

const Room = (): JSX.Element => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const { classes } = useRoomStyles();

  const {
    currentRoom: { roomData },
  } = useGlobalStore();

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <RoomHeader />
      </div>
      <div className={classes.messagesContainer}>
        <p>Start</p>
      </div>
      <div className={classes.textInputContainer}>
        <MessagesTextInput />
      </div>
    </div>
  );
};

export default Room;
