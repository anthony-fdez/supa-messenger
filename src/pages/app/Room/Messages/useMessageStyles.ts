import { createStyles } from "@mantine/core";

const useMessageStyles = createStyles((theme) => ({
  messageDiv: {
    borderRadius: "0.5rem",
    position: "relative",
    width: "100%",
    paddingLeft: 10,

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
    height: "100%",
    right: 0,
    paddingTop: "10px",
  },
  edit_input: {
    width: "calc(100% -  60px)",
    zIndex: 9999,
    top: 0,
  },
  icons: {
    cursor: "pointer",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[6],
    "&:hover": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[9],
    },
  },
}));

export default useMessageStyles;
