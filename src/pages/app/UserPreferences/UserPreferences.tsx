import { Avatar, Button, Divider, Flex } from "@mantine/core";
import React, { useState } from "react";
import { User } from "react-feather";
import useGlobalStore from "../../../store/useGlobalStore";
import EditUser from "./EditUser/EditUser";
import constants from "../../../constants/constants";

const UserPreferences = (): JSX.Element => {
  const { user } = useGlobalStore();

  const [isEditingUser, setIsEditingUser] = useState(false);

  if (isEditingUser) return <EditUser setIsEditingUser={setIsEditingUser} />;

  return (
    <div>
      <Flex
        align="center"
        justify="space-between"
      >
        <h1>Account</h1>
        <Button
          leftIcon={<User size={16} />}
          onClick={(): void => setIsEditingUser(true)}
        >
          Edit
        </Button>
      </Flex>
      <Divider mb={20} />
      <Flex
        justify="flex-start"
        wrap="wrap"
      >
        <Avatar
          mr={20}
          size={150}
          src={user.imageUrl || constants.avatarPlaceholder(user.email || "")}
        />
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </Flex>
    </div>
  );
};

export default UserPreferences;
