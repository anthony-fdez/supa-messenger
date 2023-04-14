import { createStyles } from "@mantine/core";

const useMessageStyles = createStyles((theme) => ({
  messageDiv: {
    position: "relative",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 20,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
  avatarDiv: {
    display: "flex",
  },
  messageFunctionsDiv: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    height: "100%",
    right: 0,
  },
  replyIcon: {
    cursor: "pointer",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[6],
  },
}));

export default useMessageStyles;
