import { Stepper } from "@mantine/core";
import React, { useState } from "react";
import useRegisterUserStyles from "./RegisterUser.styles";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";

export interface IStepProps {
  active: number;
  nextStep: () => void;
  prevStep: () => void;
}

const RegisterUser = (): JSX.Element => {
  const { classes, cx } = useRegisterUserStyles();

  const [active, setActive] = useState(0);
  const nextStep = () => {
    setActive((current) => (current < 2 ? current + 1 : current));
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <div className={classes.content}>
      <Stepper
        active={active}
        breakpoint="sm"
        onStepClick={setActive}
      >
        <Stepper.Step
          description="Your Info"
          label="First step"
        >
          <Step1
            active={active}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </Stepper.Step>
        <Stepper.Step
          description="Profile Image"
          label="Second step"
        >
          <Step2
            active={active}
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
