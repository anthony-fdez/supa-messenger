import { Stepper } from "@mantine/core";
import React from "react";
import useGlobalStore from "../../store/useGlobalStore";
import useRegisterUserStyles from "./RegisterUser.styles";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

export interface IStepProps {
  active: number;
  nextStep: () => void;
  prevStep: () => void;
}

const RegisterUser = (): JSX.Element => {
  const { classes } = useRegisterUserStyles();

  const { app, setApp } = useGlobalStore();

  const current = app.registerUserActiveStep;

  const nextStep = (): void => {
    setApp({ registerUserActiveStep: current < 2 ? current + 1 : current });
  };
  const prevStep = (): void => {
    setApp({ registerUserActiveStep: current > 0 ? current - 1 : current });
  };

  return (
    <div className={classes.content}>
      <Stepper
        active={current}
        breakpoint="sm"
        onStepClick={(): null => null}
      >
        <Stepper.Step
          description="Your Info"
          label="First step"
        >
          <Step1
            active={current}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </Stepper.Step>
        <Stepper.Step
          description="Profile Image"
          label="Second step"
        >
          <Step2
            active={current}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default RegisterUser;
