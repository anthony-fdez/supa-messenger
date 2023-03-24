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
    position: "sticky",
    bottom: 20,
    width: "100%",
    left: 0,
  },
}));

export default useRoomStyles;
