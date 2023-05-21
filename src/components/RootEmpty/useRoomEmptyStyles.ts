import { createStyles } from "@mantine/core";

const useRoomEmptyStyles = createStyles((theme) => ({
  root: {
    height: "80vh",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    minHeight: "8vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    maxWidth: 600,
    textAlign: "center",
  },
}));

export default useRoomEmptyStyles;
