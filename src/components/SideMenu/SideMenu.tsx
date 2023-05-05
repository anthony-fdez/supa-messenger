import React from "react";
import {
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  CloseButton,
  Accordion,
  Badge,
  Flex,
  Loader,
  Text,
  Collapse,
  Indicator,
} from "@mantine/core";
import { MessageSquare, Settings, Users } from "react-feather";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@mantine/hooks";
import useSideMenuStyles from "./SideMenu.styles";
import useHandleSignout from "../../Hooks/useHandleSignout";
import useGlobalStore from "../../store/useGlobalStore";
import ChangeThemeModal from "./ChangeThemeModal/ChangeThemeModal";
import ChatRooms from "./ChatRooms/ChatRooms";
import PublicRooms from "./PublicRooms/PublicRooms";
import DMs from "./DMs/DMs";
import UserAvatarWithIndicator from "../UserAvatarWithIndicator/UserAvatarWithIndicator";
import getUnreadMessagesInRooms from "../../helpers/getUnreadMessagesInRooms";
import getUnreadMessagesInDms from "../../helpers/getUnreadMessagesInDms";
import MessagesSideMenuScreen from "./SideMenuScreens/MessagesSideMenuScreen";

const mainLinksMockdata = [
  { icon: <MessageSquare size={16} />, label: "Messages", path: "/" },
  { icon: <Users size={16} />, label: "Friends", path: "/friends" },
  { icon: <Settings size={16} />, label: "Settings", path: "/settings" },
];

const SideMenu = (): JSX.Element => {
  const { handleSignout } = useHandleSignout();
  const navigate = useNavigate();
  const {
    preferences,
    app,
    setApp,
    user,
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

  const mainLinks = mainLinksMockdata.map((link) => (
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
          }}
        >
          {link.icon}
        </UnstyledButton>
      </Indicator>
    </Tooltip>
  ));

  const links = (): JSX.Element | JSX.Element[] => {
    if (app.mainActiveSideMenu === "Settings") {
      return (
        <>
          <Flex
            mb={10}
            p={10}
            align="center"
            direction="column"
          >
            <UserAvatarWithIndicator
              user_email={user.email || ""}
              image={user.imageUrl || ""}
              size={80}
              checkOnline
            />
            <div>
              <Title
                mt={10}
                size={24}
                lineClamp={1}
              >
                {user.name}
              </Title>
            </div>
          </Flex>
          <a
            className={cx(classes.link, {
              [classes.linkActive]:
                app.secondaryActiveSideMenu === "Settings/Account",
            })}
            href="/"
            onClick={(event): void => {
              event.preventDefault();
              setApp({
                secondaryActiveSideMenu: "Settings/Account",
                isMobileMenuOpen: false,
              });
              navigate("/account");
            }}
          >
            User Preferences
          </a>
          <a
            className={cx(classes.link, {
              [classes.linkActive]:
                app.secondaryActiveSideMenu === "Settings/Theme",
            })}
            href="/"
            onClick={(event): void => {
              event.preventDefault();
              openModal({
                title: "Change Theme",
                children: <ChangeThemeModal />,
                overlayProps: {
                  blur: 5,
                },
              });
            }}
          >
            {`Theme: ${preferences.theme}`}
          </a>
          <a
            className={cx(classes.link, {
              [classes.linkActive]:
                app.secondaryActiveSideMenu === "Settings/Theme",
            })}
            href="/"
            onClick={(event): void => {
              event.preventDefault();

              openConfirmModal({
                title: "Are you sure?",
                labels: {
                  confirm: "Yes, log out",
                  cancel: "Cancel",
                },
                onConfirm: () => {
                  handleSignout();
                  closeAllModals();
                },
                overlayProps: {
                  blur: 5,
                },
              });
            }}
          >
            Sign out
          </a>
        </>
      );
    }

    return <MessagesSideMenuScreen />;
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
        <div className={classes.aside}>{mainLinks}</div>
        <div className={classes.main}>
          <Title
            className={classes.title}
            order={4}
          >
            {app.mainActiveSideMenu}
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
