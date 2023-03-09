import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import useProtectedRoute from "../../Hooks/useProtectedRoute";
import styles from "./root.module.css";

const Root = (): JSX.Element => {
  useProtectedRoute({});

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
