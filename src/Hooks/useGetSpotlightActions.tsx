import { Loader } from "@mantine/core";
import { SpotlightAction, useSpotlight } from "@mantine/spotlight";
import React, { useEffect, useState } from "react";

export const useGetSpotLightActions = (): { actions: SpotlightAction[] } => {
  const spotlight = useSpotlight();
  const [actions, setActions] = useState<SpotlightAction[]>([
    {
      title: "Loading",
      description: "Please wait while actions load...",
      onTrigger: () => {},
      icon: <Loader />,
    },
  ]);

  useEffect(() => {
    if (!spotlight.opened) return;
  }, [spotlight.opened]);

  return { actions };
};
