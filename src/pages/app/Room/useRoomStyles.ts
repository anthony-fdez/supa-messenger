import { createStyles } from "@mantine/core";

const useRoomStyles = createStyles((theme) => ({
  container: {
    position: "relative",
  },
  headerContainer: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
  },
  messagesContainer: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  textInputContainer: {
    position: "sticky",
    bottom: 20,
    width: "100%",
    left: 0,
  },
}));

export default useRoomStyles;
