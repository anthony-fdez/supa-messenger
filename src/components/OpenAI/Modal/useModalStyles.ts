import { createStyles } from "@mantine/core";

const useModalStyles = createStyles((theme) => ({
  card: {
    marginTop: 20,
    cursor: "pointer",
    "&:hover": {
      transition: "100ms",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3],
    },
  },
}));

export default useModalStyles;
