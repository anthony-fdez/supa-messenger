import { Button, Flex, TextInput } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Database } from "../../../../types/database.types";

interface FormValues {
  roomName: string;
}

const NewRoomModal = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  const [isLoadingCreatingRoom, setIsLoadingCreatingRoom] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
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
      .select();

    if (participantError) {
      setIsLoadingCreatingRoom(false);

      return showNotification({
        title: "Error, unable to create room.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });
    }

    setIsLoadingCreatingRoom(false);
    closeAllModals();
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
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
          withAsterisk
        />
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
