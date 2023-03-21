import { Button, Divider, Flex } from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { ArrowLeft, Flag } from "react-feather";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import UploadProfileImage from "../helpers/UploadProfileImage.tsx/UploadProfileImage";
import { IStepProps } from "../RegisterUser";
import useGlobalStore from "../../../store/useGlobalStore";
import { Database } from "../../../../types/database.types";

const Step2 = ({ prevStep }: IStepProps): JSX.Element => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const { user, setUser } = useGlobalStore();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoadingSavingData, setIsLoadingSavingData] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setIsLoadingSavingData(true);

    if (!session?.user.id) {
      setIsLoadingSavingData(false);
      return showNotification({
        title: "Error, unable to save information.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });
    }

    let IMAGE_URL = null;

    if (profileImage) {
      const { data: imageUploadData, error } = await supabase.storage
        .from("profile-images")
        .upload(`${session.user.id}/profile.png`, profileImage, {
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

    if (!user.name || !session.user.email) {
      setIsLoadingSavingData(false);

      return showNotification({
        title: "Error",
        message: "Unexpected error",
      });
    }

    const { error } = await supabase.from("users").insert({
      name: user.name,
      register_complete: true,
      email: session.user.email,
      image_url: IMAGE_URL,
      id: session?.user.id,
    });

    if (error) {
      setIsLoadingSavingData(false);

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

    return setUser({
      uid: session.user.id,
      email: session.user.email,
      imageUrl: IMAGE_URL,
      registerComplete: true,
    });
  };

  return (
    <div>
      <h1>Upload your profile image</h1>
      <UploadProfileImage
        image={profileImage}
        setImage={setProfileImage}
      />

      <Divider
        mb={20}
        mt={20}
      />
      <Flex justify="space-between">
        <Button
          leftIcon={<ArrowLeft size={16} />}
          onClick={(): void => prevStep()}
          variant="outline"
        >
          Back
        </Button>

        <Button
          loading={isLoadingSavingData}
          onClick={(): void => {
            handleSubmit();
          }}
          rightIcon={<Flag size={16} />}
        >
          Finish
        </Button>
      </Flex>
    </div>
  );
};

export default Step2;
