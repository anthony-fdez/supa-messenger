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

  const getPublicRooms = async (): Promise<IDatabaseRoom[] | null> => {
    if (!session?.user.id) {
      setIsLoading(false);

      showNotification({
        title: "Error, unable to get public rooms.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });

      return null;
    }

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("is_private", false);

    if (error || !data) {
      showNotification({
        title: "Error, unable to get public rooms.",
        message:
          "Please reload the page, if the error persists try logging out and back in.",
      });

      return null;
    }

    return data;
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const rooms = await getPublicRooms();

      if (rooms) {
        setPublicRooms(rooms);
      }

      setIsLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, publicRooms };
};
