import { createStyles } from "@mantine/core";

const useRoomStyles = createStyles((theme) => ({
  headerContainer: {
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  messagesContainer: {
    minHeight: "85vh",
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
