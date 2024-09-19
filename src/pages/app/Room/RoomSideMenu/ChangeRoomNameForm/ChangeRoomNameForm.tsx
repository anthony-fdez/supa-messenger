import { Button, Flex, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import useGlobalStore from "../../../../../store/useGlobalStore";
import { Database } from "../../../../../../types/database.types";

interface FormValues {
  roomName: string;
}

const ChangeRoomNameForm = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();

  const [isLoading, setIsLoading] = useState(false);

  const {
    currentRoom: { roomData },
    setCurrentRoom,
  } = useGlobalStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      roomName: roomData?.name,
    },
  });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setIsLoading(true);

    const { data: newRoomData, error } = await supabase
      .from("rooms")
      .update({ name: data.roomName })
      .eq("id", roomData?.id || "")
      .select("*")
      .single();

    if (error || !newRoomData) {
      return showNotification({
        title: "Error",
        message: "Unable to update room name",
      });
    }

    setCurrentRoom({
      roomData: newRoomData,
    });

    showNotification({
      title: "Success",
      message: `Room name updated to "${data.roomName}"`,
    });

    return setIsLoading(false);
  });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        {...register("roomName", {
          required: "Room name is required",
          minLength: {
            value: 3,
            message: "Room name has to be at least 3 characters long.",
          },
        })}
        error={errors.roomName?.message}
        label="Change Room Name"
        mt={20}
        name="roomName"
        placeholder="Room Name"
        type="text"
      />
      <Flex
        justify="flex-end"
        mt={10}
      >
        <Button
          loading={isLoading}
          type="submit"
        >
          Save new room name
        </Button>
      </Flex>
    </form>
  );
};

export default ChangeRoomNameForm;
