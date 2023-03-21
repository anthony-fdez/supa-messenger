import React from "react";
import { createClient } from "@supabase/supabase-js";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useColorScheme } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import Root from "./pages/app/root";
import Error404 from "./pages/404/Error404";
import Chat from "./pages/app/Room/Room";
import useGlobalStore from "./store/useGlobalStore";
import UserPreferences from "./pages/app/UserPreferences/UserPreferences";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || "",
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/chat/:chatId",
        element: <Chat />,
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

  const { preferences } = useGlobalStore();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Notifications />
      <MantineProvider
        theme={{
          // @ts-ignore
          colorScheme:
            preferences.theme === "system" ? colorScheme : preferences.theme,
          primaryColor: "green",
          defaultRadius: "md",
          colors: {
            // override dark colors to change them for all components
            dark: [
              "#c2c2c2",
              "#a7a7a7",
              "#7e7e7e",
              "#636363",
              "#474747",
              "#3f3f3f",
              "#202020",
              "#1a1a1a",
              "#141414",
              "#111111",
            ],
          },
          components: {
            Button: {
              defaultProps: {
                size: "xs",
                color: "green",
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
        <ModalsProvider>
          <RouterProvider router={router} />
          <LoadingOverlay />
        </ModalsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default App;
