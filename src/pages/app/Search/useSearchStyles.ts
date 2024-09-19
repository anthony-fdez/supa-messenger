import { createStyles } from "@mantine/core";

export const useSearchStyles = createStyles((theme) => ({
  headerContainer: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  search_container: {
    marginTop: 20,
    width: "100%",
  },
}));
