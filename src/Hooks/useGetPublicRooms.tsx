import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { IDatabaseRoom } from "../store/useGlobalStore";
import { Database } from "../../types/database.types";

export const useGetPublicRooms = () => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [publicRooms, setPublicRooms] = useState<IDatabaseRoom[] | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const getPublicRooms = async (): Promise<void> => {
      if (!session?.user.id) {
        setIsLoading(false);

        return showNotification({
          title: "Error, unable to get public rooms.",
          message:
            "Please reload the page, if the error persists try logging out and back in.",
        });
      }

      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("is_private", false);

      if (error || !data) {
        return showNotification({
          title: "Error, unable to get public rooms.",
          message:
            "Please reload the page, if the error persists try logging out and back in.",
        });
      }

      return setPublicRooms(data);
    };

    getPublicRooms().finally(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, publicRooms };
};
