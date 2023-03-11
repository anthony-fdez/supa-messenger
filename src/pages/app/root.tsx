import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
import { Outlet } from "react-router-dom";
import AuthUser from "../../components/AuthUser/AuthUser";
import RegisterUser from "../../components/RegisterUser/RegisterUser";
import SideMenu from "../../components/SideMenu/SideMenu";
import useLoadUserData from "../../Hooks/useLoadUserData";
import useGlobalStore from "../../store/useGlobalStore";
import styles from "./root.module.css";

const Root = (): JSX.Element => {
  useLoadUserData();

  const session = useSession();
  const { user } = useGlobalStore();

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
      <SideMenu />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
