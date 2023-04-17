import { IFriend } from "../../store/useGlobalStore";

interface Props {
  friendship: IFriend;
  userId: string;
}

const getFriend = ({ friendship, userId }: Props) => {
  if (friendship.user_id_1 === userId) {
    return { friendData: friendship.userData2, status: friendship.status };
  }

  if (friendship.user_id_2 === userId) {
    return { friendData: friendship.userData1, status: friendship.status };
  }

  return { friendData: null, status: null };
};

export default getFriend;
