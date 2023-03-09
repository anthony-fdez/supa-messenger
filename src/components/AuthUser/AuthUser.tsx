import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import React from "react";
import { Card, useMantineTheme, Alert } from "@mantine/core";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AlertCircle } from "react-feather";
import { useColorScheme } from "@mantine/hooks";
import styles from "./AuthUser.module.css";
import useGlobalStore from "../../store/useGlobalStore";

interface Props {
  message?: string;
  messageHeader?: string;
}

const AuthUser = ({ message, messageHeader }: Props): JSX.Element => {
  const supabase = useSupabaseClient();
  const theme = useMantineTheme();
  const { preferences } = useGlobalStore();
  const colorScheme = useColorScheme();

  return (
    <Card
      className={styles.container}
      withBorder
    >
      <h1>Account.</h1>
      {message && (
        <Alert
          icon={<AlertCircle size={16} />}
          title={messageHeader && messageHeader}
        >
          {message}
        </Alert>
      )}
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
        redirectTo="/"
        socialLayout="horizontal"
        supabaseClient={supabase}
        theme={preferences.theme === "system" ? colorScheme : preferences.theme}
      />
    </Card>
  );
};

export default AuthUser;
