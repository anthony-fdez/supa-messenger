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
      <Text sx={{ maxWidth: 600, textAlign: "center" }}>
        Pull yourself up, partner. Time to cowboy up and start spittin&apos; out
        some words. Ain&apos;t no room here for silence. Be a man, start saying
        something.
      </Text>
    </Flex>
  );
};

export default EmptyRoom;
