import { Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSession } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AuthUser from "../../components/AuthUser/AuthUser";
import RegisterUser from "../../components/RegisterUser/RegisterUser";
import SideMenu from "../../components/SideMenu/SideMenu";
import useLoadUserData from "../../Hooks/useLoadUserData";
import useGlobalStore from "../../store/useGlobalStore";
import styles from "./root.module.css";

const Root = (): JSX.Element => {
  useLoadUserData();

  const isMobile = useMediaQuery("(max-width: 900px)");
  const session = useSession();
  const { user } = useGlobalStore();

  console.log(isMobile);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  if (!session) {
    return (
      <AuthUser
        message="Please log in to continue"
        messageHeader="Unauthorized"
      />
    );
  }

  if (session && !user.registerComplete) {
    return <RegisterUser />;
  }

  return (
    <div className={styles.container}>
      {isMobile ? (
        <Drawer
          style={{ position: "relative" }}
          onClose={(): void => setIsSideMenuOpen(false)}
          opened={isSideMenuOpen}
        >
          <SideMenu />
        </Drawer>
      ) : (
        <SideMenu />
      )}
      <SideMenu />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
