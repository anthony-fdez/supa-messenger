import { Button, Flex, Switch, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import useGlobalStore from "../../../../../store/useGlobalStore";
import { Database } from "../../../../../../types/database.types";
import useHttp from "../../../../../Hooks/useHttp";

interface FormValues {
  roomPassword: string;
}

const ChangeRoomPrivacy = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const { http } = useHttp();

  const {
    currentRoom: { roomData },
    setCurrentRoom,
  } = useGlobalStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(roomData?.is_private);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      roomPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setIsLoading(true);

    if (roomData?.is_private !== isPrivate) {
      const { data: newRoomData, error: newRoomError } = await supabase
        .from("rooms")
        .update({
          is_private: isPrivate,
        })
        .eq("id", roomData?.id)
        .select("*")
        .single();

      if (!newRoomData || newRoomError) {
        setIsLoading(false);

        return showNotification({
          title: "Error",
          message: "Unable to change room privacy settings",
        });
      }

      setCurrentRoom({
        roomData: newRoomData,
      });
    }

    const resData = await http({
      method: "POST",
      endpoint: "/room/change-room-password",
      body: {
        password: data.roomPassword,
        room_id: roomData?.id,
      },
    });

    if (resData.error) {
      setIsLoading(false);

      return showNotification({
        title: "Error",
        message: JSON.stringify(resData.error),
      });
    }

    showNotification({
      title: "Success",
      message: "Room privacy settings was updated",
    });

    return setIsLoading(false);
  });

  return (
    <form onSubmit={onSubmit}>
      <Switch
        // @ts-ignore
        checked={isPrivate}
        label="Is room private"
        mt={30}
        onChange={(value): void => setIsPrivate(value.currentTarget.checked)}
      />
      {isPrivate && (
        <TextInput
          {...register("roomPassword", {
            required: "New room password is required",
            minLength: {
              value: 6,
              message: "Room password must be at least 6 characters long",
            },
          })}
          error={errors.roomPassword?.message}
          label="Change Room Password"
          mt={10}
          name="roomPassword"
          placeholder="********"
          type="password"
        />
      )}

      <Flex
        justify="flex-end"
        mt={10}
      >
        <Button
          loading={isLoading}
          type="submit"
        >
          Save Changes
        </Button>
      </Flex>
    </form>
  );
};

export default ChangeRoomPrivacy;
