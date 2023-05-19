import { createStyles } from "@mantine/core";

const useRootStyles = createStyles((theme) => ({
  container: {
    marginLeft: 400,
    "@media (max-width: 900px)": {
      marginLeft: 0,
    },
  },
  content: {
    maxWidth: "calc(100% - 400px)",
    paddingTop: 0,
    paddingRight: 20,
    paddingLeft: 20,
    "@media (max-width: 900px)": {
      marginTop: 60,
    },
    "@media (max-width: 1200px)": {
      maxWidth: "calc(100%)",
    },
  },
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[1],

    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
  },
}));

export default useRootStyles;
