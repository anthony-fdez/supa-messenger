import { createStyles } from "@mantine/core";

const useRoomHeaderStyles = createStyles((theme) => ({
  container: {
    zIndex: 999,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3]
    }`,
    "@media (max-width: 900px)": {
      padding: 5,
    },
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
  },

  participants: {
    cursor: "pointer",
    marginRight: 20,
  },
}));

export default useRoomHeaderStyles;
