import { Button, Divider, Flex, Grid, TextInput } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { Save, Trash } from "react-feather";
import { useForm } from "react-hook-form";
import UploadProfileImage from "../../../../components/RegisterUser/helpers/UploadProfileImage.tsx/UploadProfileImage";
import useGlobalStore from "../../../../store/useGlobalStore";
import { Database } from "../../../../types/database.types";

interface IFormValues {
  name: string;
}

interface Props {
  setIsEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditUser = ({ setIsEditingUser }: Props): JSX.Element => {
  const { user, setUser } = useGlobalStore();
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(user.imageUrl);
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      name: user.name || "",
    },
  });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setIsSavingChanges(true);

    if (!session?.user.id) {
      setIsSavingChanges(false);
      return showNotification({
        title: "Error, unable to save information.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });
    }

    let IMAGE_URL = imageUrl;

    if (image) {
      const { data: imageUploadData, error } = await supabase.storage
        .from("profile-images")
        .upload(`${session.user.id}/profile.png`, image, {
          cacheControl: "0",
          upsert: true,
        });

      if (error) {
        return showNotification({
          title: "Error.",
          message: error.message,
        });
      }

      const { data: imageUrlData } = await supabase.storage
        .from("profile-images")
        .getPublicUrl(imageUploadData.path);

      if (!imageUrlData) {
        return showNotification({
          title: "Error.",
          message: "Unable to get image URL",
        });
      }

      IMAGE_URL = imageUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("users")
      .update({
        name: data.name,
        id: session?.user.id,
      })
      .eq("id", session.user.id);

    if (error) {
      setIsSavingChanges(false);

      return openModal({
        title: "Could not complete setup",
        overlayProps: {
          blur: 5,
        },
        children: (
          <div>
            <p>
              There was an error while we tried to process your signup, please
              try again later.
            </p>
            <br />
            <p>Details:</p>
            <p>{error?.message}</p>
            <Flex
              justify="flex-end"
              mt={20}
            >
              <Button
                onClick={(): void => {
                  closeAllModals();
                }}
              >
                Close
              </Button>
            </Flex>
          </div>
        ),
      });
    }

    setIsSavingChanges(false);
    setIsEditingUser(false);

    return setUser({
      imageUrl: IMAGE_URL,
      name: data.name,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <h1>Edit Profile</h1>
      <Divider mb={20} />
      <Grid>
        <Grid.Col span={6}>
          <UploadProfileImage
            image={image}
            imageUrl={imageUrl}
            setImage={setImage}
            setImageUrl={setImageUrl}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            {...register("name", {
              required: "Your name is required",
              minLength: {
                value: 5,
                message: "At least 5 letters",
              },
            })}
            description="This is your publicly shown name"
            error={errors.name?.message}
            label="Your Name"
            placeholder="Fidel Castro"
            withAsterisk
          />
        </Grid.Col>
      </Grid>
      <Divider
        mb={10}
        mt={20}
      />
      <Flex justify="flex-end">
        <Button
          color="red"
          leftIcon={<Trash size={16} />}
          mr={10}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          leftIcon={<Save size={16} />}
          loading={isSavingChanges}
          type="submit"
        >
          Save Changes
        </Button>
      </Flex>
    </form>
  );
};

export default EditUser;
