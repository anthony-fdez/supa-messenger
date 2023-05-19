import { createStyles } from "@mantine/core";

const useRoomSideMenuStyles = createStyles(() => ({
  container: {
    height: "calc(100vh - 40px)",
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxWidth: 200,
  },
}));

export default useRoomSideMenuStyles;
