import React from "react";
import {
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  CloseButton,
  Accordion,
  Button,
  Badge,
  Flex,
  Loader,
  Text,
  Collapse,
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

const mainLinksMockdata = [
  { icon: <MessageSquare size={16} />, label: "Messages", path: "/" },
  { icon: <Users size={16} />, label: "Public Rooms", path: "/public" },
  { icon: <Settings size={16} />, label: "Settings", path: "/settings" },
];

const SideMenu = (): JSX.Element => {
  const { handleSignout } = useHandleSignout();
  const navigate = useNavigate();
  const {
    preferences,
    app,
    setApp,
    friendships: { requests },
  } = useGlobalStore();

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

    if (app.mainActiveSideMenu === "Public Rooms") return <PublicRooms />;

    return (
      <>
        <Collapse in={app.isLoadingRooms}>
          <Flex
            align="center"
            p={20}
            pt={0}
          >
            <Loader
              mr={10}
              size={20}
            />
            <Text size={14}>Updating...</Text>
          </Flex>
        </Collapse>

        <Button
          onClick={() => {
            setApp({ isFriendsMenuOpen: true });
          }}
          variant="light"
          className={classes.newRoomButton}
          rightIcon={
            requests.length !== 0 && (
              <Badge
                color="red"
                variant="filled"
              >
                {requests.length}
              </Badge>
            )
          }
        >
          Friends
        </Button>
        <Accordion
          sx={{
            ".mantine-Accordion-content": {
              padding: 0,
              paddingTop: 20,
              paddingBottom: 20,
            },
          }}
        >
          <Accordion.Item value="dms">
            <Accordion.Control>DMs</Accordion.Control>
            <Accordion.Panel>
              <DMs />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="chat-room">
            <Accordion.Control>Chat Room</Accordion.Control>
            <Accordion.Panel>
              <ChatRooms />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </>
    );
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
          <div className={classes.linkContainer}>{links()}</div>
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideMenu;
