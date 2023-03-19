import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { Alert, Button, Skeleton, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import useGlobalStore, { IDatabaseRoom } from "../../../store/useGlobalStore";
import { Database } from "../../../types/database.types";
import NewRoomModal from "../ChatRooms/Components/NewRoomModal";
import useSideMenuStyles from "../SideMenu.styles";

const PublicRooms = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const navigate = useNavigate();
  const { classes, cx } = useSideMenuStyles();
  const { app, setApp } = useGlobalStore();

  const [isLoading, setIsLoading] = useState(true);
  const [publicRooms, setPublicRooms] = useState<IDatabaseRoom[] | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const getPublicRooms = async (): Promise<void> => {
      if (!session?.user.id) {
        setIsLoading(false);

        return showNotification({
          title: "Error, unable to get public rooms.",
          message:
            "Please reload the page, if the error persists try logging out and back in.",
        });
      }

      const { data, error } = await supabase.from("rooms").select("*");

      if (error || !data) {
        return showNotification({
          title: "Error, unable to get public rooms.",
          message:
            "Please reload the page, if the error persists try logging out and back in.",
        });
      }

      return setPublicRooms(data);
    };

    getPublicRooms().finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <>
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
        <Skeleton
          height={40}
          m={10}
          width="calc(100% - 20px)"
        />
      </>
    );
  }

  if (!publicRooms) {
    return (
      <Alert
        color="red"
        m={10}
        title="Error"
      >
        We were unable to get the public rooms at the moment.
      </Alert>
    );
  }

  if (publicRooms.length === 0) {
    return (
      <Alert
        m={10}
        title="So empty"
      >
        There are no public rooms at the moment. Be a man... and create that
        first room
        <Button
          fullWidth
          mt={15}
          onClick={(): void => {
            openModal({
              title: "Create room",
              children: <NewRoomModal navigate={navigate} />,
              overlayProps: {
                blur: 5,
              },
            });
          }}
        >
          Create a room
        </Button>
      </Alert>
    );
  }

  return (
    <div>
      {publicRooms.map((room) => {
        if (room.is_private) return null;

        return (
          <a
            key={room.id}
            className={cx(classes.link, {
              [classes.linkActive]:
                app.secondaryActiveSideMenu === room.id.toString(),
            })}
            href="/"
            onClick={(event): void => {
              event.preventDefault();
              setApp({
                secondaryActiveSideMenu: room.id.toString(),
              });
              navigate(`/chat/${room.id}`);
            }}
          >
            <Text lineClamp={1}>{room.name}</Text>
          </a>
        );
      })}
    </div>
  );
};

export default PublicRooms;
