import { Button, Flex, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGlobalStore from "../../../../../../store/useGlobalStore";

interface FormValues {
  roomName: string;
}

const ChangeRoomNameForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentRoom: { roomData },
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

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
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
