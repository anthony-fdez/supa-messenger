import React, { useState } from "react";
import { Navbar, UnstyledButton, Tooltip, Title } from "@mantine/core";
import { MessageSquare, Settings, User } from "react-feather";
import useSideMenuStyles from "./SideMenu.styles";

const mainLinksMockdata = [
  { icon: <MessageSquare size={16} />, label: "Messages", path: "/" },
  { icon: <Settings size={16} />, label: "Settings", path: "/settings" },
];

const linksMockdata = [
  "Security",
  "Settings",
  "Dashboard",
  "Releases",
  "Account",
  "Orders",
  "Clients",
  "Databases",
  "Pull Requests",
  "Open Issues",
  "Wiki pages",
];

const SideMenu = (): JSX.Element => {
  const { classes, cx } = useSideMenuStyles();
  const [active, setActive] = useState("Releases");
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
        onClick={() => setActive(link.label)}
      >
        {link.icon}
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      key={link}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link,
      })}
      href="/"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
    >
      {link}
    </a>
  ));

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

          {links}
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default SideMenu;
