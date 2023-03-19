import { useSession } from "@supabase/auth-helpers-react";
import constants from "../constants/constants";

interface IHttp {
  body: any;
  endpoint: string;
  method: "POST" | "GET" | "DELETE" | "UPDATE";
}

const useHttp = () => {
  const session = useSession();

  const http = async ({ body, endpoint, method }: IHttp): Promise<any> => {
    if (!session) return;

    const res = await fetch(`${constants.serverURL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        jwt: session.access_token,
        refreshToken: session.refresh_token,
      }),
    });

    const data = await res.json();

    // eslint-disable-next-line consistent-return
    return data;
  };

  return { http };
};

export default useHttp;
