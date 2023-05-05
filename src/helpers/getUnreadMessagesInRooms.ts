import { IRoom, IUnreadMessages } from "./../store/useGlobalStore";

interface Props {
  rooms: IRoom[];
  unreadMessages: IUnreadMessages[];
}

const getUnreadMessagesInRooms = ({ unreadMessages, rooms }: Props) => {
  let unread = 0;

  unreadMessages.forEach((message) => {
    if (rooms.find((dm) => dm.id === message.room_id)) {
      unread += message.message_count;
    }
  });

  return unread;
};

export default getUnreadMessagesInRooms;
