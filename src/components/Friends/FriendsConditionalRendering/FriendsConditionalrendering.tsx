import useGlobalStore, { IFriend } from "../../../store/useGlobalStore";

interface Props {
  children: JSX.Element;
  renderIf?: "FRIENDS" | "PENDING" | "REQUEST" | "NOT_FRIENDS";
  userId: string;
}

const FriendsConditionalRendering = ({
  children,
  userId,
  renderIf = "FRIENDS",
}: Props): JSX.Element | null => {
  const { friendships, user } = useGlobalStore();

  const checkIfFriend = (friendship: IFriend) => {
    return friendship.user_id_1 === userId || friendship.user_id_2 === userId;
  };

  const checkIfPending = (friendship: IFriend) => {
    if (
      friendship.status === "PENDING" &&
      friendship.action_user_id === user.uid
    ) {
      return friendship.user_id_1 === userId || friendship.user_id_2 === userId;
    }

    return false;
  };

  const checkIfRequest = (friendship: IFriend) => {
    if (
      friendship.status === "REQUEST" &&
      friendship.action_user_id !== user.uid
    ) {
      return friendship.user_id_1 === userId || friendship.user_id_2 === userId;
    }

    return false;
  };

  if (renderIf === "FRIENDS") {
    const isFriends = friendships.friends.some(checkIfFriend);

    if (!isFriends) return null;

    return children;
  }

  if (renderIf === "NOT_FRIENDS") {
    const isFriends = friendships.friends.some(checkIfFriend);
    const isPending = friendships.pending.some(checkIfFriend);
    const isRequest = friendships.requests.some(checkIfFriend);

    if (isFriends || isPending || isRequest) return null;

    return children;
  }

  if (renderIf === "PENDING") {
    const isPending = friendships.pending.some(checkIfPending);

    if (!isPending) return null;

    return children;
  }

  if (renderIf === "REQUEST") {
    const isRequest = friendships.pending.some(checkIfRequest);

    if (!isRequest) return null;

    return children;
  }

  return null;
};

export default FriendsConditionalRendering;
