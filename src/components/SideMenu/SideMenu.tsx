import React from "react";
import {
  CloseButton,
  Flex,
  Indicator,
  Navbar,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GitHub, MessageSquare, Settings, Users } from "react-feather";
import getUnreadMessagesInDms from "../../helpers/getUnreadMessagesInDms";
import getUnreadMessagesInRooms from "../../helpers/getUnreadMessagesInRooms";
import useGlobalStore from "../../store/useGlobalStore";
import useSideMenuStyles from "./SideMenu.styles";
import Latency from "../Latency/Latency";
import { SideMenuSettings } from "./Settings/SideMenuSettings";
import { SideMenuFriends } from "./Friends/FriendsSideMenuScreen";
import { SideMenuMessages } from "./Messages/SideMenuMessages";

type MainLinkType = {
  icon: JSX.Element;
  label: string;
  path: string;
};

const topLinks: MainLinkType[] = [
  { icon: <MessageSquare size={16} />, label: "Messages", path: "/" },
  { icon: <Users size={16} />, label: "Friends", path: "/friends" },
];

const bottomLinks: MainLinkType[] = [
  {
    icon: <GitHub size={16} />,
    label: "GitHub",
    path: "https://github.com/anthony-fdez/supa-messenger",
  },
  { icon: <Settings size={16} />, label: "Settings", path: "/settings" },
];

const SideMenu = (): JSX.Element => {
  const {
    app,
    setApp,

    unreadMessages,
    dms,
    rooms,
    friendships: { requests },
  } = useGlobalStore();

  const { classes, cx } = useSideMenuStyles();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const getUnreadNotificationsForMostLeftMenu = ({
    menu,
  }: {
    menu: string;
  }) => {
    if (menu === "Friends") {
      return requests.length;
    }

    if (menu === "Messages") {
      return (
        getUnreadMessagesInRooms({ rooms, unreadMessages }) +
        getUnreadMessagesInDms({ dms, unreadMessages })
      );
    }

    return 0;
  };

  const mainLink = (link: MainLinkType) => {
    return (
      <Tooltip
        key={link.label}
        label={link.label}
        position="right"
        transitionProps={{ duration: 0 }}
        withArrow
      >
        <Indicator
          label={getUnreadNotificationsForMostLeftMenu({ menu: link.label })}
          disabled={
            getUnreadNotificationsForMostLeftMenu({
              menu: link.label,
            }) === 0
          }
          inline
          color="red"
          size={16}
          offset={5}
          position="bottom-end"
        >
          <UnstyledButton
            className={cx(classes.mainLink, {
              [classes.mainLinkActive]: link.label === app.mainActiveSideMenu,
            })}
            onClick={(): void => {
              setApp({ mainActiveSideMenu: link.label });

              if (link.label === "GitHub") {
                window.open(link.path, "_blank");
              }
            }}
          >
            {link.icon}
          </UnstyledButton>
        </Indicator>
      </Tooltip>
    );
  };

  const links = (): JSX.Element | JSX.Element[] => {
    if (app.mainActiveSideMenu === "Settings") {
      return <SideMenuSettings />;
    }

    if (app.mainActiveSideMenu === "Friends") {
      return <SideMenuFriends />;
    }

    return <SideMenuMessages />;
  };

  return (
    <Navbar
      className={classes.container}
      width={{ sm: 400 }}
    >
      <Navbar.Section
        className={classes.wrapper}
        grow
      >
        <div className={classes.aside}>
          <div className={classes.aside_top}>
            {topLinks.map((link) => mainLink(link))}
          </div>
          <div className={classes.aside_bottom}>
            {bottomLinks.map((link) => mainLink(link))}
          </div>
        </div>
        <div className={classes.main}>
          <Title
            className={classes.title}
            order={4}
          >
            <Flex align="center">
              <Latency />

              {app.mainActiveSideMenu}
            </Flex>

            {isMobile && (
              <CloseButton
                onClick={(): void => setApp({ isMobileMenuOpen: false })}
                size="lg"
              />
            )}
          </Title>

          <div className={classes.linkContainer}>{links()}</div>
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideMenu;
