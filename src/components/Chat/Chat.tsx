import React from "react";
import { useParams } from "react-router";

const Chat = (): JSX.Element => {
  const { chatId } = useParams();

  return <h1>Chat {chatId}</h1>;
};

export default Chat;
