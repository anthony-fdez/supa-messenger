import React from "react";
import { Database } from "../../../../../types/database.types";

interface Props {
  messages: Database["public"]["Tables"]["messages"]["Row"][];
}

const Messages = ({ messages }: Props): JSX.Element => {
  return <p>Message lol</p>;
};

export default Messages;
