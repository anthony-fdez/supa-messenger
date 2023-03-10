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
} from "@mantine/core";
import { ArrowLeft, Flag, Image, Upload, X } from "react-feather";
import { useForm } from "react-hook-form";
import { IStepProps } from "../RegisterUser";

interface IFormValues {
  profileImage: File;
}

const Step2 = ({ prevStep, nextStep, active }: IStepProps): JSX.Element => {
  const theme = useMantineTheme();

  const [profileImage, setProfileImage] = useState<File | null>(null);

  return (
    <div>
      <h1>Upload your profile image</h1>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        maxSize={3 * 1024 ** 2}
        multiple={false}
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
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
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
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
          rightIcon={<Flag size={16} />}
          type="submit"
        >
          Finish
        </Button>
      </Flex>
    </div>
  );
};

export default Step2;
