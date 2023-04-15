import React from "react";
import { CornerUpLeft, Edit } from "react-feather";

import { Flex } from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import useGlobalStore from "../../../../../store/useGlobalStore";
import { Database } from "../../../../../types/database.types";
import useMessageStyles from "../useMessageStyles";

const MessageFunctions = () => {
  const supabase = useSupabaseClient<Database>();
  const { classes } = useMessageStyles();
  const handleReply = () => {
    console.log("reply");
  };

  const handleEdit = () => {
    // const { data, error } = await supabase
    //   .select(*)
    //   .from("messages")
    //   .where(id === 123)
    //   .insert({
    //     message_body: message,
    //     room_id: roomData.id,
    //     is_edited: true,
    //     user_id: session.user.id,
    //   })
    //   .select()
    //   .single();
  };

  const { setReplyMessage, replyMessage } = useGlobalStore();
  return (
    <div>
      <Flex
        gap={10}
        style={{ marginRight: "10px" }}
      >
        <CornerUpLeft
          size={20}
          className={classes.icons}
          onClick={handleReply}
        />
        <Edit
          size={20}
          className={classes.icons}
          onClick={handleEdit}
        />
      </Flex>
    </div>
  );
};

export default MessageFunctions;
