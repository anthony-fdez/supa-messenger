import { Button, Flex, Switch, TextInput } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavigateFunction } from "react-router";
import useGlobalStore, { IRoom } from "../../../../store/useGlobalStore";
import { Database } from "../../../../types/database.types";

interface FormValues {
  isPrivate: boolean;
  roomName: string;
  roomPassword: string;
}

interface Props {
  navigate: NavigateFunction;
}

const NewRoomModal = ({ navigate }: Props): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const { setRooms, rooms, setApp } = useGlobalStore();

  const [isLoadingCreatingRoom, setIsLoadingCreatingRoom] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const isPrivate = watch("isPrivate");

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setIsLoadingCreatingRoom(true);

    if (!session?.user.id) {
      setIsLoadingCreatingRoom(false);

      return showNotification({
        title: "Error, unable to save information.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });
    }

    const { data: roomData, error: roomError } = await supabase
      .from("rooms")
      .insert({
        created_by: session.user.id,
        name: data.roomName,
        is_private: data.isPrivate,
      })
      .select()
      .single();

    if (roomError) {
      setIsLoadingCreatingRoom(false);

      return showNotification({
        title: "Error, unable to create room.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });
    }

    const { data: participantData, error: participantError } = await supabase
      .from("participants")
      .insert({
        user_id: session.user.id,
        room_id: roomData.id,
      })
      .select(
        `
        *,
        userData:users (
         *
        )`,
      );

    if (participantError || !participantData) {
      setIsLoadingCreatingRoom(false);

      return showNotification({
        title: "Error, unable to create room.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });
    }

    const roomFormattedData: IRoom = {
      ...roomData,
      participants: [],
    };

    participantData.forEach((participant) => {
      roomFormattedData.participants.push({
        ...participant,
        userData: participant.userData,
      });
    });

    setRooms([...rooms, roomFormattedData]);

    setApp({
      secondaryActiveSideMenu: roomFormattedData.id.toString(),
    });
    navigate(`/chat/${roomFormattedData.id}`);

    setIsLoadingCreatingRoom(false);
    return closeAllModals();
  });

  return (
    <div>
      <form
        autoComplete="off"
        autoCorrect="off"
        onSubmit={onSubmit}
      >
        <TextInput
          {...register("roomName", {
            required: "A room name is required",
            minLength: {
              value: 3,
              message: "Room name needs to be at lest 3 characters long",
            },
          })}
          error={errors.roomName?.message}
          label="Room Name"
          placeholder="The GOAT devs room"
          type="text"
          withAsterisk
        />
        <Switch
          {...register("isPrivate")}
          label="Make this room private"
          mt={20}
        />
        {isPrivate && (
          <TextInput
            {...register("roomPassword", {
              required: "A password is required for private rooms",
              minLength: {
                value: 4,
                message: "Room name needs to be at lest 3 characters long",
              },
            })}
            autoComplete="new-password"
            error={errors.roomPassword?.message}
            label="Room Password"
            mt={10}
            placeholder="******"
            type="password"
            withAsterisk
          />
        )}
        <Flex
          justify="end"
          mt={20}
        >
          <Button
            mr={10}
            onClick={(): void => {
              closeAllModals();
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            loading={isLoadingCreatingRoom}
            type="submit"
          >
            Create Room
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default NewRoomModal;
