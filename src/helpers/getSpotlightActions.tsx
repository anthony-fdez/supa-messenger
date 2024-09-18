import { AlertTriangle, MessageCircle, User } from "react-feather";
import { IGlobalState } from "../store/useGlobalStore";
import React from "react";

type Props = {
  globalStore: IGlobalState;
};

export const getSpotlightActions = ({ globalStore }: Props) => {
  const { app } = globalStore;

  const actions = [
    {
      title: "Go to room",
      onTrigger: () => {},
      icon: <MessageCircle size={16} />,
    },
    {
      title: "Search users",
      onTrigger: () => {},
      icon: <User size={16} />,
    },
  ];

  return actions;
};
