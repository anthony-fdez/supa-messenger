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
    setCurrentRoom,
  } = useGlobalStore();

  // @ts-ignore
  useEffect(() => {
    const channel = supabase.channel(roomData?.id.toString() || "", {
      config: {
        presence: {
          key: session?.user.id,
        },
      },
    });

    channel
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const presenceTrackStatus = await channel.track({
            user: session?.user.id,
            online_at: new Date().toISOString(),
          });

          if (presenceTrackStatus === "ok") {
            await channel.untrack();
          }
        }
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();

        setCurrentRoom({
          onlineUsers: state,
        });
      });

    return () => channel.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getRoomData = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomData?.id);

      console.log(session?.user.id);

      console.log(data);
      console.log(error);
    };

    getRoomData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <RoomHeader />
      </div>
      <div className={classes.messagesContainer}>{/* <Messages /> */}</div>
      <div className={classes.textInputContainer}>
        <MessagesTextInput />
      </div>
    </div>
  );
};

export default Room;
