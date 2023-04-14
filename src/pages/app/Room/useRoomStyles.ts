import { createStyles } from "@mantine/core";

const useRoomStyles = createStyles((theme) => ({
  container: {
    position: "relative",
  },
  headerContainer: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  messagesContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    minHeight: "85vh",
  },
  textInputContainer: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white,

    position: "sticky",
    width: "100%",
    paddingBottom: 20,
    bottom: 0,
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
