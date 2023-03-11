import { ActionIcon, Burger, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
import { Outlet } from "react-router-dom";
import AuthUser from "../../components/AuthUser/AuthUser";
import RegisterUser from "../../components/RegisterUser/RegisterUser";
import SideMenu from "../../components/SideMenu/SideMenu";
import useLoadUserData from "../../Hooks/useLoadUserData";
import useGlobalStore from "../../store/useGlobalStore";
import useRootStyles from "./useRootStyles";

const Root = (): JSX.Element => {
  useLoadUserData();

  const { classes } = useRootStyles();

  const isMobile = useMediaQuery("(max-width: 900px)");
  const session = useSession();
  const { user, app, setApp } = useGlobalStore();

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
    <div className={classes.container}>
      {isMobile ? (
        <>
          <div className={classes.header}>
            <h3>App name</h3>
            <ActionIcon
              onClick={(): void => setApp({ isMobileMenuOpen: true })}
            >
              <Burger opened={app.isMobileMenuOpen} />
            </ActionIcon>
          </div>
          <Drawer
            onClose={(): void => setApp({ isMobileMenuOpen: false })}
            opened={app.isMobileMenuOpen}
            overlayProps={{ blur: 5 }}
            position="right"
            withCloseButton
            zIndex={20}
          >
            <SideMenu />
          </Drawer>
        </>
      ) : (
        <SideMenu />
      )}
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
