import { IRoom, IUnreadMessages } from "./../store/useGlobalStore";

interface Props {
  dms: IRoom[];
  unreadMessages: IUnreadMessages[];
}

const getUnreadMessagesInDms = ({ dms, unreadMessages }: Props) => {
  let unread = 0;

  unreadMessages.forEach((message) => {
    if (dms.find((dm) => dm.id === message.room_id)) {
      unread += message.message_count;
    }
  });

  return unread;
};

export default getUnreadMessagesInDms;
