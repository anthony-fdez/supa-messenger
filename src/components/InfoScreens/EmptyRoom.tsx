import React from "react";
import { Flex, Text } from "@mantine/core";
import RandomAvatarAnimated from "./RandomAvatarAnimated/RandomAvatarAnimated";

const EmptyRoom = (): JSX.Element => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      sx={{ height: "70%" }}
    >
      <RandomAvatarAnimated size={200} />
      <h1>No messages... yet</h1>
      <Text>Be a MAN, and say something!</Text>
    </Flex>
  );
};

export default EmptyRoom;
