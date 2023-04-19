import { createStyles } from "@mantine/core";

const useRoomStyles = createStyles((theme) => ({
  headerContainer: {
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  messagesContainer: {
    paddingTop: 20,

    "@media (min-width: 901px)": {
      minHeight: "85vh",
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
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],

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
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: "100%",
    padding: 20,
    "@media (max-width: 1200px)": {
      display: "none",
    },
  },
}));

export default useRoomStyles;
