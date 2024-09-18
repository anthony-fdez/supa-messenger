import { Flex, Title } from "@mantine/core";
import React from "react";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import useGlobalStore from "../../../store/useGlobalStore";
import useSideMenuStyles from "../SideMenu.styles";
import useHandleSignout from "../../../Hooks/useHandleSignout";
import { ChangeTheme } from "./ChangeTheme/ChangeTheme";
import { ChangeUiColor } from "./ChangeUiColor/ChangeUiColor";

export const SideMenuSettings = (): JSX.Element => {
  const { classes, cx } = useSideMenuStyles();
  const navigate = useNavigate();
  const { handleSignout } = useHandleSignout();

  const { preferences, app, setApp, user } = useGlobalStore();

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
      <span
        className={cx(classes.link, {
          [classes.linkActive]:
            app.secondaryActiveSideMenu === "Settings/Account",
        })}
        onClick={(event): void => {
          event.preventDefault();
          setApp({
            secondaryActiveSideMenu: "Settings/Account",
            isMobileMenuOpen: false,
          });
          navigate("/app/account");
        }}
      >
        User Preferences
      </span>
      <span
        className={cx(classes.link, {
          [classes.linkActive]:
            app.secondaryActiveSideMenu === "Settings/Theme",
        })}
        onClick={(event): void => {
          event.preventDefault();
          openModal({
            title: "Change Theme",
            children: <ChangeTheme />,
            overlayProps: {
              blur: 5,
            },
          });
        }}
      >
        {`Theme: ${preferences.theme}`}
      </span>
      <span
        className={cx(classes.link, {
          [classes.linkActive]:
            app.secondaryActiveSideMenu === "Settings/Theme",
        })}
        onClick={(event): void => {
          event.preventDefault();
          openModal({
            title: "Change UI Color",
            children: <ChangeUiColor />,
            overlayProps: {
              blur: 5,
            },
          });
        }}
      >
        {`Color: ${preferences.uiColor}`}
      </span>
      <span
        className={cx(classes.link, {
          [classes.linkActive]:
            app.secondaryActiveSideMenu === "Settings/Theme",
        })}
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
      </span>
    </>
  );
};
