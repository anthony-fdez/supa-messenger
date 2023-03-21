import { createStyles } from "@mantine/core";

const useRoomHeaderStyles = createStyles((theme) => ({
  container: {
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
    "@media (max-width: 900px)": {
      padding: 5,
    },
  },
  title: {
    maxWidth: "50%",
  },
  participants: {},
}));

export default useRoomHeaderStyles;
