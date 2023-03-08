import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu/SideMenu";
import styles from "./root.module.css";

const Root = (): JSX.Element => {
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
