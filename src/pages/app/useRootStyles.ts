import { createStyles } from "@mantine/core";

const useRootStyles = createStyles((theme) => ({
  container: {
    marginLeft: 300,
    "@media (max-width: 900px)": {
      marginLeft: 0,
    },
  },
  content: {
    maxWidth: 1000,
    margin: "auto",
    padding: 20,
    "@media (max-width: 900px)": {
      marginTop: 60,
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
  },
}));

export default useRootStyles;
