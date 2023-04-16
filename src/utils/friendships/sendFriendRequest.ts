import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/database.types";
import { IGlobalState } from "../../store/useGlobalStore";

interface Props {
  friendEmail: string;
  friendUserId: number;
  globalStore: IGlobalState;
  session: Session | null;
  supabase: SupabaseClient<Database>;
}

const sendFriendRequest = async ({
  friendEmail,
  friendUserId,
  session,
  supabase,
  globalStore,
}: Props) => {
  const { error };
};

export default sendFriendRequest;
