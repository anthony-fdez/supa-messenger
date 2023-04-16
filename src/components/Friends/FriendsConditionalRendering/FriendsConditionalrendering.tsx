import useGlobalStore, { IFriend } from "../../../store/useGlobalStore";

interface Props {
  children: JSX.Element;
  hideIfFriends?: boolean;
  userId: string;
}

const FriendsConditionalRendering = ({
  children,
  userId,
  hideIfFriends = false,
}: Props): JSX.Element | null => {
  const { friends } = useGlobalStore();

  const checkIfFriend = (friendship: IFriend) => {
    return friendship.user_id_1 === userId || friendship.user_id_2 === userId;
  };

  const isFriends = friends.some(checkIfFriend);

  if (hideIfFriends) {
    if (isFriends) return null;

    return children;
  }

  if (isFriends) return children;

  return null;
};

export default FriendsConditionalRendering;
