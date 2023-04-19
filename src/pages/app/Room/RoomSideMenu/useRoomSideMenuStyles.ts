import { createStyles } from "@mantine/core";

const useRoomSideMenuStyles = createStyles(() => ({
  container: {
    height: "calc(100vh - 40px)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default useRoomSideMenuStyles;
