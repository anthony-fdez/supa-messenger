import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import AuthUser from "../../components/AuthUser/AuthUser";

const AuthPage = (): JSX.Element => {
  const session = useSession();

  if (session) {
    return <h1>You are already signed in </h1>;
  }

  return <AuthUser />;
};

export default AuthPage;
