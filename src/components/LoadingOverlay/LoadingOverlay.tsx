import { Loader } from "@mantine/core";
import React from "react";
import useGlobalStore from "../../store/useGlobalStore";
import useLoadingOverlayStyles from "./useLoadingOverlayStyles";

const LoadingOverlay = (): JSX.Element | null => {
  const { app } = useGlobalStore();

  const { classes } = useLoadingOverlayStyles();

  if (!app.isLoading) return null;

  return (
    <div>
      <div className={classes.backdrop} />
      <div className={classes.container}>
        <Loader />
      </div>
    </div>
  );
};

export default LoadingOverlay;
