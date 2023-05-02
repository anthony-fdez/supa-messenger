import { Burger, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthUser from "../../components/AuthUser/AuthUser";
import RegisterUser from "../../components/RegisterUser/RegisterUser";
import SideMenu from "../../components/SideMenu/SideMenu";
import useLoadUserData from "../../Hooks/useLoadUserData";
import useRootStyles from "./useRootStyles";
import { Database } from "../../../types/database.types";
import removeTypingIndicatorFromOfflineUsers from "../../helpers/removeTypingIndicatorFromOfflineUsers";
import useListenToFriendshipChanges from "../../Hooks/friendships/useListenToFrienshipChanges";
import useGlobalStore from "../../store/useGlobalStore";
import useListenToRoomChanges from "../../Hooks/rooms/useListenToRoomChanges";
import useLoadUnreadMessages from "../../Hooks/rooms/useLoadUnreadMessages";
import RoomHeader from "./Room/RoomHeader/RoomHeader";

const Root = (): JSX.Element => {
  const { getUserFriends, getUserRoomData } = useLoadUserData();
  useListenToFriendshipChanges({ getUserFriends, getUserRoomData });
  useListenToRoomChanges({ getUserRoomData });

  const { getUnreadMessages } = useLoadUnreadMessages();

  const { classes } = useRootStyles();

  const isMobile = useMediaQuery("(max-width: 900px)");
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const {
    user,
    app,
    setApp,
    currentRoom: { usersTyping },
    setCurrentRoom,
  } = useGlobalStore();

  useEffect(() => {
    getUnreadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void | (() => void) => {
    if (!session) return;

    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: session.user.email,
        },
      },
    });

    channel
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const presenceTrackStatus = await channel.track({
            user: session.user.email,
            online_at: new Date().toISOString(),
          });

          if (presenceTrackStatus === "ok") {
            await channel.untrack();
          }
        }
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();

        removeTypingIndicatorFromOfflineUsers({
          usersTyping,
          setCurrentRoom,
          onlineUsers: state,
        });

        setApp({
          onlineUsers: state,
        });
      });

    // eslint-disable-next-line consistent-return
    return () => channel.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!session) {
    return <AuthUser />;
  }

  if (session && !user.registerComplete) {
    return <RegisterUser />;
  }

  return (
    <div className={classes.container}>
      {isMobile ? (
        <>
          <div className={classes.header}>
            <RoomHeader />
            {/* <h3>App name</h3>
            <ActionIcon
              onClick={(): void => setApp({ isMobileMenuOpen: true })}
            >
              <Burger opened={app.isMobileMenuOpen} />
            </ActionIcon> */}
          </div>
          <Drawer
            onClose={(): void => setApp({ isMobileMenuOpen: false })}
            opened={app.isMobileMenuOpen}
            overlayProps={{ blur: 5 }}
            position="right"
            withCloseButton
            zIndex={100}
          >
            <SideMenu />
          </Drawer>
        </>
      ) : (
        <SideMenu />
      )}
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
