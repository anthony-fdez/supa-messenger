import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  redirectTo?: string;
}

const useProtectedRoute = ({ redirectTo = "/unauthorized" }: Props): void => {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (session) return;

    navigate(redirectTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, navigate]);
};

export default useProtectedRoute;
