import React from "react";
import { Select, Divider, Flex, Button } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import useGlobalStore, { UiColorsType } from "../../../../store/useGlobalStore";

export const ChangeUiColor = (): JSX.Element => {
  const { setPreferences } = useGlobalStore();

  return (
    <div>
      <Select
        data={[
          { value: "red", label: "Red" },
          { value: "pink", label: "Pink" },
          { value: "grape", label: "Grape" },
          { value: "violet", label: "Violet" },
          { value: "indigo", label: "Indigo" },
          { value: "blue", label: "Blue" },
          { value: "cyan", label: "Cyan" },
          { value: "teal", label: "Teal" },
          { value: "green", label: "Green" },
          { value: "lime", label: "Lime" },
          { value: "yellow", label: "Yellow" },
          { value: "orange", label: "Orange" },
        ]}
        label="Choose the UI Color"
        onChange={(value: UiColorsType): void => {
          if (!value) return;

          setPreferences({
            uiColor: value,
          });
        }}
        placeholder="Chose a UI Color"
        withinPortal
      />
      <Divider
        mb={10}
        mt={20}
      />
      <Flex justify="flex-end">
        <Button
          onClick={(): void => {
            closeAllModals();
          }}
        >
          Done
        </Button>
      </Flex>
    </div>
  );
};
