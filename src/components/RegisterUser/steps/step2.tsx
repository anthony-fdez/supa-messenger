import React, { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Button,
  Flex,
  Divider,
  Avatar,
} from "@mantine/core";
import { ArrowLeft, Flag, Image, Trash, Upload, X } from "react-feather";
import { closeAllModals, openModal } from "@mantine/modals";
import { IStepProps } from "../RegisterUser";

const Step2 = ({ prevStep }: IStepProps): JSX.Element => {
  const theme = useMantineTheme();

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const displayUploadedImage = (): JSX.Element => {
    if (!profileImage) return <p>Unable to preview image.</p>;

    const imagePreview = URL.createObjectURL(profileImage);

    return (
      <Flex
        justify="center"
        mt={20}
      >
        <Avatar
          radius="50%"
          size={250}
          src={imagePreview}
        />
      </Flex>
    );
  };

  return (
    <div>
      <h1>Upload your profile image</h1>
      {profileImage ? (
        displayUploadedImage()
      ) : (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          maxSize={3 * 1024 ** 2}
          multiple={false}
          onDrop={(files): void => {
            setProfileImage(files[0]);
          }}
          onReject={(): void => {
            openModal({
              title: "Unable to use that image",
              children: (
                <div>
                  <p>Please be sure that the file you uploaded was an image</p>
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
          }}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <Upload
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
                size="3.2rem"
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <X
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                size="3.2rem"
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Image size="3.2rem" />
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
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}

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
        <Flex>
          {profileImage && (
            <Button
              color="red"
              leftIcon={<Trash size={16} />}
              mr={10}
              onClick={(): void => {
                setProfileImage(null);
              }}
              variant="outline"
            >
              Remove Imge
            </Button>
          )}

          <Button
            rightIcon={<Flag size={16} />}
            type="submit"
          >
            Finish
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Step2;
