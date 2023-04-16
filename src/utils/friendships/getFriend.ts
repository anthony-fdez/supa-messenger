import { IFriend } from "../../store/useGlobalStore";

interface Props {
  friendship: IFriend;
  userId: string;
}

const getFriend = ({ friendship, userId }: Props) => {
  if (friendship.user_id_1 === userId) {
    return { friendData: friendship.userData2 };
  }

  if (friendship.user_email_2 === userId) {
    return { friendData: friendship.userData1 };
  }

  return { friendData: null };
};

export default getFriend;
