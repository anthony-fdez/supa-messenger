import { Button, Card, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

const EnterRoomPassword = (): JSX.Element => {
  return (
    <div>
      <Card
        sx={{ maxWidth: "500px", margin: "auto" }}
        withBorder
      >
        <h1>Private Room</h1>
        <Text c="dimmed">
          This is a private room, enter the room password to join.
        </Text>
        <TextInput
          label="Room Password"
          mt={20}
          placeholder="******"
          type="password"
          withAsterisk
        />
        <Flex
          justify="flex-end"
          mt={20}
        >
          <Button>Join Room</Button>
        </Flex>
      </Card>
    </div>
  );
};

export default EnterRoomPassword;
