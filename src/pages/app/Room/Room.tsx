import React from "react";
import { useParams } from "react-router";
import useChatData from "../../../Hooks/useChatData";
import RoomNotFound from "./RoomNotFound/RoomNotFound";
import LoadingRoomData from "./LoadingRoomData/LoadingRoomData";
import EnterRoomPassword from "./EnterRoomPassword/EnterRoomPassword";
import RoomHeader from "./RoomHeader/RoomHeader";
import useGlobalStore from "../../../store/useGlobalStore";
import MessagesTextInput from "./MessagesTextInput/MessagesTextInput";
import useRoomStyles from "./useRoomStyles";

const Chat = (): JSX.Element => {
  const { chatId } = useParams();
  const { getRoomData } = useChatData({ roomId: chatId });
  const { classes } = useRoomStyles();

  const {
    currentRoom: { roomData, isLoading, roomNotFound, isRoomMember },
  } = useGlobalStore();

  if (isLoading) return <LoadingRoomData />;
  if (roomNotFound) return <RoomNotFound />;
  if (!isRoomMember && roomData?.is_private) {
    return (
      <EnterRoomPassword
        getRoomData={getRoomData}
        roomId={chatId}
      />
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <RoomHeader />
      </div>
      <div className={classes.messagesContainer}>
        <p>Start</p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
        <p>
          Exercitation aliquip laboris deserunt id. Est eiusmod sit aliquip non
          ut enim duis laboris tempor mollit non in. Cupidatat qui pariatur quis
          cillum amet nulla ipsum ad fugiat.
        </p>
      </div>
      <div className={classes.textInputContainer}>
        <MessagesTextInput />
      </div>
    </div>
  );
};

export default Chat;
