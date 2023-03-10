import { Button, Divider, Flex } from "@mantine/core";
import React, { useState } from "react";
import { ArrowLeft, Flag } from "react-feather";
import UploadProfileImage from "../helpers/UploadProfileImage.tsx/UploadProfileImage";
import { IStepProps } from "../RegisterUser";

const Step2 = ({ prevStep }: IStepProps): JSX.Element => {
  const [profileImage, setProfileImage] = useState<File | null>(null);

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
