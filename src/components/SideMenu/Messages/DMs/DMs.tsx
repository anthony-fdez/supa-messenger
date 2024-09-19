import React from "react";
import { Alert, Badge, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import useGlobalStore, {
  IDatabaseUser,
  IFriend,
} from "../../../../store/useGlobalStore";
import useSideMenuStyles from "../../SideMenu.styles";
import getFriend from "../../../../utils/friendships/getFriend";
import UserAvatarWithIndicator from "../../../UserAvatarWithIndicator/UserAvatarWithIndicator";

const DMs = (): JSX.Element => {
  const { classes, cx } = useSideMenuStyles();
  const {
    app,
    setApp,
    dms,
    unreadMessages,
    user: { uid },
  } = useGlobalStore();
  const navigate = useNavigate();

  const getFriendData = (friendship: IFriend[]): IDatabaseUser | null => {
    if (friendship.length === 0) return null;

    const friend = getFriend({ friendship: friendship[0], userId: uid || "" });

    if (!friend || !friend.friendData) return null;

    return friend.friendData;
  };

  if (dms.length === 0) {
    return (
      <Alert
        m={10}
        mt={0}
        title="No direct messages"
      >
        You have no DMs yet. Go to a public room to start chatting with people.
      </Alert>
    );
  }

  return (
    <div>
      {dms.map((room) => {
        const friendData = getFriendData(room.friendships);
        const unread = unreadMessages.find((r) => r.room_id === room.id);

        if (!friendData) return null;

        return (
          <a
            key={room.id}
            className={cx(classes.link, {
              [classes.linkActive]:
                app.secondaryActiveSideMenu === room.id.toString(),
            })}
            href="/"
            onClick={(event): void => {
              event.preventDefault();
              setApp({
                secondaryActiveSideMenu: room.id.toString(),
                isMobileMenuOpen: false,
              });
              navigate(`/chat/${room.id}`);
            }}
          >
            <UserAvatarWithIndicator
              checkOnline
              size={35}
              user_email={friendData?.email || "Error"}
              image={friendData?.image_url || ""}
            />
            {unread && unread?.message_count >= 1 && (
              <Badge
                variant="filled"
                color="red"
                ml={8}
                sx={{ minWidth: 50 }}
              >
                {unread.message_count > 99 ? "99+" : unread.message_count || 0}
              </Badge>
            )}
            <Text
              ml={8}
              lineClamp={1}
            >
              {friendData?.name || "Error"}
            </Text>
          </a>
        );
      })}
    </div>
  );
};

export default DMs;
