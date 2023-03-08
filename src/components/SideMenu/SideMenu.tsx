import React, { useState } from "react";
import { Navbar, UnstyledButton, Tooltip, Title } from "@mantine/core";
import { MessageSquare, Settings } from "react-feather";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import useSideMenuStyles from "./SideMenu.styles";
import useHandleSignout from "../../Hooks/useHandleSignout";

const mainLinksMockdata = [
  { icon: <MessageSquare size={16} />, label: "Messages", path: "/" },
  { icon: <Settings size={16} />, label: "Settings", path: "/settings" },
];

const linksMockdata = [
  {
    name: "Hello",
    id: 23,
  },
  {
    name: "Test",
    id: 22323,
  },
  {
    name: "Pp",
    id: 223,
  },
  {
    name: "The goat",
    id: 23111,
  },
  {
    name: "The other goat",
    id: 122,
  },
];

const SideMenu = (): JSX.Element => {
  const { handleSignout } = useHandleSignout();
  const navigate = useNavigate();

  const { classes, cx } = useSideMenuStyles();
  const [active, setActive] = useState("Messages");
  const [activeLink, setActiveLink] = useState("Settings");

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
          [classes.mainLinkActive]: link.label === active,
        })}
        onClick={() => {
          setActive(link.label);
        }}
      >
        {link.icon}
      </UnstyledButton>
    </Tooltip>
  ));

  const links = () => {
    if (active === "Settings") {
      return (
        <>
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeLink === "Settings/Account",
            })}
            href="/"
            onClick={(event) => {
              event.preventDefault();
              setActiveLink("Settings/Account");
            }}
          >
            User Preferences
          </a>
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeLink === "Settings/Theme",
            })}
            href="/"
            onClick={(event) => {
              event.preventDefault();
              // Handle changing theme
            }}
          >
            Theme: Light
          </a>
          <a
            className={cx(classes.link, {
              [classes.linkActive]: activeLink === "Settings/Theme",
            })}
            href="/"
            onClick={(event) => {
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

    return linksMockdata.map((link) => (
      <a
        key={link.id}
        className={cx(classes.link, {
          [classes.linkActive]: activeLink === link.id.toString(),
        })}
        href="/"
        onClick={(event) => {
          event.preventDefault();
          setActiveLink(link.id.toString());
          navigate(`/chat/${link.id}`);
        }}
      >
        {link.name}
      </a>
    ));
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
            {active}
          </Title>

          {links()}
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideMenu;
