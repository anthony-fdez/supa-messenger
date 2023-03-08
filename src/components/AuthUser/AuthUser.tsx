import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import React from "react";
import { Card, useMantineTheme } from "@mantine/core";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import styles from "./AuthUser.module.css";

const AuthUser = (): JSX.Element => {
  const supabase = useSupabaseClient();
  const theme = useMantineTheme();

  return (
    <Card
      className={styles.container}
      withBorder
    >
      <h1>Account.</h1>
      <Auth
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: theme.colors.cyan[6],
                brandAccent: theme.colors.cyan[7],
              },
            },
          },
        }}
        providers={[]}
        socialLayout="horizontal"
        supabaseClient={supabase}
        theme="light"
      />
    </Card>
  );
};

export default AuthUser;
