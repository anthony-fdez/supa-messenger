import { Input } from "@mantine/core";
import React from "react";
import { useSearchStyles } from "./useSearchStyles";

export const Search = () => {
  const { classes } = useSearchStyles();

  return (
    <div className={classes.search_container}>
      <div className={classes.headerContainer}>
        <Input placeholder="Search" />
      </div>
      <div>{/* <Messages /> */}</div>
    </div>
  );
};
