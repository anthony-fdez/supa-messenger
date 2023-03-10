import React from "react";
import { Button, Card, Divider, Flex, Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Image, Trash, Upload, X } from "react-feather";
import { showNotification } from "@mantine/notifications";
import styles from "./UploadProfileImage.module.css";

interface IUploadProfileImage {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadProfileImage = ({
  image,
  setImage,
}: IUploadProfileImage): JSX.Element => {
  const imageUpload = (): JSX.Element => {
    return (
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        maxSize={3 * 1024 ** 2}
        multiple={false}
        onDrop={(files): void => {
          setImage(files[0]);
        }}
        onReject={(): void => {
          showNotification({
            title: "Invalid image.",
            message: "Images need to be less than 5MB",
          });
        }}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 120, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <Upload size={50} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <X size={50} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Image size={50} />
          </Dropzone.Idle>

          <div>
            <Text
              inline
              size="xl"
            >
              Drag images here or click to select files
            </Text>
            <Text
              color="dimmed"
              inline
              mt={7}
              size="sm"
            >
              Attach your business logo
            </Text>
          </div>
        </Group>
      </Dropzone>
    );
  };

  const imageUploaded = (): JSX.Element => {
    const imagePreviewCard = (src: string): JSX.Element => {
      return (
        <Card withBorder>
          <img
            alt="Uploaded Business"
            className={styles.image}
            src={src}
          />
          <Divider
            mb={10}
            mt={10}
          />
          <Flex justify="end">
            <Button
              color="red"
              leftIcon={<Trash size={16} />}
              onClick={(): void => {
                setImage(null);
              }}
              variant="outline"
            >
              Remove image
            </Button>
          </Flex>
        </Card>
      );
    };

    if (!image) {
      return (
        <Card withBorder>
          <p>
            There was an error loading your image, please try selecting it
            again. If the error persists your image might be in the wrong format
          </p>
        </Card>
      );
    }

    const uploadedImageGeneratedUrl = URL.createObjectURL(image);

    return imagePreviewCard(uploadedImageGeneratedUrl);
  };

  const returnCorrectComponent = (): JSX.Element => {
    if (image) return imageUploaded();

    return imageUpload();
  };

  return (
    <>
      {returnCorrectComponent()}
      <Text
        color="dimmed"
        size={12}
      >
        This image will be visible by other people. This is optional, and you
        can upload this image later on if you want!
      </Text>
    </>
  );
};

export default UploadProfileImage;
