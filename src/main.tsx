import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createClient } from "@supabase/supabase-js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Root from "./pages/root";
import Error404 from "./pages/404/Error404";
import AuthPage from "./pages/auth/AuthPage";
import Chat from "./components/Chat/Chat";

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <MantineProvider
        theme={{
          colorScheme: "light",
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
  </React.StrictMode>,
);
