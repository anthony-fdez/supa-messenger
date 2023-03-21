import React from "react";
import { useParams } from "react-router";
import useChatData from "../../../Hooks/useChatData";

const Chat = (): JSX.Element => {
  const { chatId } = useParams();
  useChatData({ roomId: chatId });

  return <h1>{chatId}</h1>;
};

export default Chat;
