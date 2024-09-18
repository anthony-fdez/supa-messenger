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
import RoomLayout from "./pages/app/Room/index";
import useGlobalStore from "./store/useGlobalStore";
import UserPreferences from "./pages/app/UserPreferences/UserPreferences";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import ChatGptModal from "./components/OpenAI/Modal/ChatGPTModal";
import constants from "./constants/constants";

const supabase = createClient(
  constants.supabaseUrl || "",
  constants.supabaseAnonKey || "",
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/app",
    element: (
      <>
        <ChatGptModal />
        <Root />
      </>
    ),
    errorElement: <Error404 />,
    children: [
      {
        path: "/app/chat/:roomId",
        element: <RoomLayout />,
      },
      {
        path: "/app/account",
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
