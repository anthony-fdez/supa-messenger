import { MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import constants from "./constants/constants";
import Error404 from "./pages/404/Error404";
import RoomLayout from "./pages/app/Room/index";
import Root from "./pages/app/root";
import UserPreferences from "./pages/app/UserPreferences/UserPreferences";
import useGlobalStore from "./store/useGlobalStore";

const supabase = createClient(
  constants.supabaseUrl || "",
  constants.supabaseAnonKey || "",
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/chat/:roomId",
        element: <RoomLayout />,
      },
      {
        path: "/account",
        element: <UserPreferences />,
      },
    ],
  },
]);

const App = (): JSX.Element => {
  const colorScheme = useColorScheme();

  const {
    preferences: { theme, uiColor },
  } = useGlobalStore();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <MantineProvider
        theme={{
          // @ts-ignore
          colorScheme: theme === "system" ? colorScheme : theme,
          primaryColor: uiColor,
          defaultRadius: "lg",
          colors: {
            // override dark colors to change them for all components
            dark: [
              "#b0b0b0",
              "#949494",
              "#6e6e6e",
              "#535353",
              "#373737",
              "#2f2f2f",
              "#101010",
              "#0e0e0e",
              "#0a0a0a",
              "#0c0c0c",
            ],
          },
          components: {
            Button: {
              defaultProps: {
                size: "xs",
                color: uiColor,
              },
            },
            Modal: {
              defaultProps: {
                overlayBlur: 5,
                overlayColor: "gray",
              },
            },
            Drawer: {
              defaultProps: {
                overlayBlur: 5,
                overlayColor: "gray",
              },
            },
          },
        }}
        withGlobalStyles
      >
        <Notifications />
        <ModalsProvider>
          <RouterProvider router={router} />
          <LoadingOverlay />
        </ModalsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default App;
