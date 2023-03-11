import { createStyles } from "@mantine/core";

const useLoadingOverlayStyles = createStyles((theme) => ({
  backdrop: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    left: 0,
    top: 0,
    opacity: 0.7,
    zIndex: 9998,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
  },
  container: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    zIndex: 9999,
    left: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(5px)",
  },
}));

export default useLoadingOverlayStyles;
