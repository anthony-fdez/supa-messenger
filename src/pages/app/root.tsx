import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
import { Outlet } from "react-router-dom";
import AuthUser from "../../components/AuthUser/AuthUser";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "./root.module.css";

const Root = (): JSX.Element => {
  const session = useSession();

  if (!session) {
    return (
      <AuthUser
        message="Please log in to continue"
        messageHeader="Unauthorized"
      />
    );
  }

  return (
    <div>
      <SideMenu />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
