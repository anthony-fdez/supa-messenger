import { Button, Divider, Flex, TextInput } from "@mantine/core";
import React from "react";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import { IStepProps } from "../RegisterUser";

interface IFormValues {
  name: string;
}

const Step1 = ({ prevStep, nextStep, active }: IStepProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    nextStep();
  });

  console.log(errors);

  return (
    <form onSubmit={onSubmit}>
      <h1>Your basic info</h1>
      <TextInput
        {...register("name", {
          required: "Your name is required",
          minLength: {
            value: 5,
            message: "At least 5 letters",
          },
        })}
        description="This is going to be your public name"
        error={errors.name?.message}
        label="Name"
        placeholder="Fidel Castro"
        withAsterisk
      />
      <Divider
        mb={20}
        mt={20}
      />
      <Flex justify="end">
        <Button
          rightIcon={<ArrowRight size={16} />}
          type="submit"
        >
          Next
        </Button>
      </Flex>
    </form>
  );
};

export default Step1;
