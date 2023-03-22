import { Button, Card, Flex, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import useHttp from "../../../../Hooks/useHttp";

interface Props {
  getRoomData: () => Promise<void>;
  roomId?: string;
}

interface FormValues {
  roomPassword: string;
}

const EnterRoomPassword = ({ getRoomData, roomId }: Props): JSX.Element => {
  const { http } = useHttp();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    if (!roomId) {
      setIsLoading(false);

      return showNotification({
        title: "Unable to join room",
        color: "red",
        message:
          "An error ocurred while trying to join the room, try refreshing your browser and try again",
      });
    }
    setIsLoading(true);

    const resData = await http({
      method: "POST",
      endpoint: "/room/verify-password",
      body: {
        room_id: roomId,
        password: data.roomPassword,
      },
    });

    if (resData?.error) {
      setIsLoading(false);

      return showNotification({
        title: "Error",
        message: resData?.error,
        color: "red",
      });
    }

    getRoomData();

    return setIsLoading(false);
  });

  return (
    <form
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      onSubmit={onSubmit}
    >
      <Card
        sx={{ maxWidth: "500px", margin: "auto" }}
        withBorder
      >
        <h1>Private Room</h1>
        <Text c="dimmed">
          This is a private room, enter the room password to join.
        </Text>
        <TextInput
          {...register("roomPassword", {
            minLength: {
              value: 4,
              message: "Password should be at least 6 characters long",
            },
            required: "Room password is required",
          })}
          error={errors.roomPassword?.message}
          label="Room Password"
          mt={20}
          placeholder="******"
          type="password"
          withAsterisk
        />
        <Flex
          justify="flex-end"
          mt={20}
        >
          <Button
            loading={isLoading}
            type="submit"
          >
            Join Room
          </Button>
        </Flex>
      </Card>
    </form>
  );
};

export default EnterRoomPassword;
