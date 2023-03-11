import { Avatar, Button, Divider, Flex } from "@mantine/core";
import React, { useState } from "react";
import { User } from "react-feather";
import useLoadUserData from "../../../Hooks/useLoadUserData";
import useGlobalStore from "../../../store/useGlobalStore";
import EditUser from "./EditUser/EditUser";

const UserPreferences = (): JSX.Element => {
  useLoadUserData();

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
          src={user.imageUrl}
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
