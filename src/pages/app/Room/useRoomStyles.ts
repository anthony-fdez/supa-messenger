import { createStyles } from "@mantine/core";

const useRoomStyles = createStyles((theme) => ({
  headerContainer: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  messagesContainer: {
    paddingTop: 20,
    position: "relative",
    width: "100%",

    "@media (min-width: 901px)": {
      minHeight: "calc(100vh - 120px)",
      position: "relative",
      height: "calc(100vh - 200px)",
    },
    "@media (max-width: 900px)": {
      height: "calc(100vh - 200px)",
      position: "relative",
    },
  },
  textInputContainer: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "100%",
  },
  desktopSideMenu: {
    position: "fixed",
    right: 0,
    top: 0,
    width: 400,
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    height: "100%",
    padding: 20,
    "@media (max-width: 1200px)": {
      display: "none",
    },
  },
  join_room_container: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    left: 0,
    top: 0,
  },
}));

export default useRoomStyles;
