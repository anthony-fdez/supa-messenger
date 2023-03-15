import React from "react";
import {
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  CloseButton,
} from "@mantine/core";
import { MessageSquare, Settings } from "react-feather";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@mantine/hooks";
import useSideMenuStyles from "./SideMenu.styles";
import useHandleSignout from "../../Hooks/useHandleSignout";
import useGlobalStore from "../../store/useGlobalStore";
import ChangeThemeModal from "./ChangeThemeModal/ChangeThemeModal";
import ChatRooms from "./ChatRooms/ChatRooms";

const mainLinksMockdata = [
  { icon: <MessageSquare size={16} />, label: "Messages", path: "/" },
  { icon: <Settings size={16} />, label: "Settings", path: "/settings" },
];

const SideMenu = (): JSX.Element => {
  const { handleSignout } = useHandleSignout();
  const navigate = useNavigate();
  const { preferences, app, setApp } = useGlobalStore();

  const { classes, cx } = useSideMenuStyles();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      key={link.label}
      label={link.label}
      position="right"
      transitionProps={{ duration: 0 }}
      withArrow
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
    </Tooltip>
  ));

  const links = (): JSX.Element | JSX.Element[] => {
    if (app.mainActiveSideMenu === "Settings") {
      return (
        <>
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

    return <ChatRooms />;
  };

  return (
    <Navbar
      className={classes.container}
      width={{ sm: 300 }}
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

          {links()}
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideMenu;
