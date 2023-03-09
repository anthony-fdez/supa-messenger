import { Avatar, Divider, Flex } from "@mantine/core";
import React from "react";

const UserPreferences = (): JSX.Element => {
  return (
    <div>
      <h1>Account</h1>
      <Divider mb={20} />
      <Flex
        justify="flex-start"
        wrap="wrap"
      >
        <Avatar
          mr={20}
          size={150}
        />
        <div>
          <h1>Username</h1>
          <p>email</p>
        </div>
      </Flex>
    </div>
  );
};

export default UserPreferences;
