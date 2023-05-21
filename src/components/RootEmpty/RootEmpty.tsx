import React from "react";
import { useLocation } from "react-router";
import { Text, Title } from "@mantine/core";
import useRoomEmptyStyles from "./useRoomEmptyStyles";
import RandomAvatarAnimated from "../InfoScreens/RandomAvatarAnimated/RandomAvatarAnimated";

const RootEmpty = (): JSX.Element | null => {
  const location = useLocation();
  const { classes } = useRoomEmptyStyles();

  if (location.pathname !== "/") return null;

  return (
    <div className={classes.root}>
      <RandomAvatarAnimated size={260} />
      <Title mt={20}>Hey there</Title>
      <Text className={classes.text}>
        Well now, friend, I reckon you might want to consider jawin&apos; with
        some folks, or just cast your eyes &apos;round this contraption.
        You&apos;d be surprised at what you might find if you just take a
        gander. Ain&apos;t no harm in a little exploration, now is there?
      </Text>
    </div>
  );
};

export default RootEmpty;
