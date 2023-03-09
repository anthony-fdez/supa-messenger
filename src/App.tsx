import React from "react";
import { createClient } from "@supabase/supabase-js";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useColorScheme } from "@mantine/hooks";
import Root from "./pages/app/root";
import Error404 from "./pages/404/Error404";
import AuthPage from "./pages/Auth/AuthPage";
import Chat from "./pages/app/Chat/Chat";
import useGlobalStore from "./store/useGlobalStore";

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
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

const App = (): JSX.Element => {
  const colorScheme = useColorScheme();

  const { preferences } = useGlobalStore();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <MantineProvider
        theme={{
          colorScheme:
            preferences.theme === "system" ? colorScheme : preferences.theme,
          primaryColor: "cyan",
          defaultRadius: "md",

          components: {
            Button: {
              defaultProps: {
                size: "xs",
                color: "cyan",
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
        </ModalsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default App;
