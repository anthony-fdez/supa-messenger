import { Flex, Title } from "@mantine/core";
import React from "react";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useNavigate } from "react-router";
import UserAvatarWithIndicator from "../../UserAvatarWithIndicator/UserAvatarWithIndicator";
import useGlobalStore from "../../../store/useGlobalStore";
import useSideMenuStyles from "../SideMenu.styles";
import ChangeThemeModal from "../ChangeThemeModal/ChangeThemeModal";
import useHandleSignout from "../../../Hooks/useHandleSignout";

const SettingsSideMenuScreen = (): JSX.Element => {
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
};

export default SettingsSideMenuScreen;
