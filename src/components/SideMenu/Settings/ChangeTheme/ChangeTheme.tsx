import React from "react";
import { Select, Divider, Flex, Button } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import useGlobalStore from "../../../../store/useGlobalStore";

export const ChangeTheme = (): JSX.Element => {
  const { setPreferences } = useGlobalStore();

  return (
    <div>
      <Select
        data={[
          { value: "system", label: "System Default" },
          { value: "dark", label: "Dark" },
          { value: "light", label: "Light" },
        ]}
        label="Select the App's theme"
        onChange={(value): void => {
          if (!value) return;

          setPreferences({
            theme: value,
          });
        }}
        placeholder="Dark's better..."
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
