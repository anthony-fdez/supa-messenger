import {
  ActionIcon,
  Button,
  Flex,
  HoverCard,
  Loader,
  Text,
  Textarea,
} from "@mantine/core";
import moment from "moment";
import React, { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Send } from "react-feather";
import { Database } from "../../../../../../types/database.types";
import UserAvatarWithIndicator from "../../../../../components/UserAvatarWithIndicator/UserAvatarWithIndicator";
import UserPopup from "../../../../../components/UserPopup/UserPopup";
import useGlobalStore, {
  IDatabaseMessages,
} from "../../../../../store/useGlobalStore";
import MessageFunctions from "../MessagesFunctions/MessageFunctions";
import useMessageStyles from "../useMessageStyles";

interface Props {
  message: IDatabaseMessages;
}

const Message = ({ message }: Props): JSX.Element => {
  const { classes } = useMessageStyles();
  const supabase = useSupabaseClient<Database>();

  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const { user } = useGlobalStore();

  const outsideClickRef = useClickOutside(() => setIsEditingMessage(false));

  const removeMessage = (id: number) => {
    const removeMessageAsync = async () => {
      if (!message.id || !user.uid) {
        return showNotification({
          title: "Error",
          message: "Error, please refresh page and try again.",
        });
      }

      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) {
        return showNotification({
          title: "Error",
          message: error.message,
        });
      }
      return null;
    };

    removeMessageAsync().finally(() => {
      closeAllModals();
    });
  };

  const handleEdit = async (m: IDatabaseMessages) => {
    setIsSendingMessage(true);
    console.log(message.id);

    const { error } = await supabase
      .from("messages")
      .update({
        message_body: editMessage,
      })
      .eq("id", m.id);

    if (error) {
      setIsSendingMessage(false);
      return showNotification({
        title: "Error",
        message: "Unable to send message.",
      });
    }

    if (editMessage.length <= 0) {
      setIsSendingMessage(false);

      return openModal({
        title: "Warning",
        children: (
          <>
            <p>Are you sure you want to remove message?</p>
            <Flex
              mt={20}
              justify="flex-end"
            >
              <Button
                variant="light"
                mr={10}
                onClick={() => closeAllModals()}
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => removeMessage(message.id)}
              >
                Remove
              </Button>
            </Flex>
          </>
        ),
      });
    }

    setIsSendingMessage(false);
    setIsEditingMessage(false);

    return setEditMessage("");
  };

  const sendButton = (): JSX.Element => {
    return (
      <ActionIcon type="submit">
        {isSendingMessage ? <Loader size={16} /> : <Send size={16} />}
      </ActionIcon>
    );
  };

  return (
    <div>
      {!isEditingMessage && user.uid === message.user_id ? (
        <HoverCard
          shadow="md"
          position="top-end"
        >
          <HoverCard.Target>
            <Flex
              key={message.id}
              mb={10}
              className={classes.messageDiv}
              justify="space-between"
            >
              <Flex>
                <div className={classes.avatarDiv}>
                  <UserPopup
                    user={{
                      // @ts-ignore
                      email: message.userData.email || "",
                      // @ts-ignore
                      id: message.userData.id || "",
                      // @ts-ignore
                      imageUrl: message.userData.image_url || "",
                      // @ts-ignore
                      name: message.userData.name || "",
                    }}
                  >
                    <UserAvatarWithIndicator
                      // @ts-ignore
                      user_email={message.userData.email}
                      size={30}
                      // @ts-ignore
                      image={message.userData.image_url}
                    />
                  </UserPopup>
                </div>
                <div style={{ marginLeft: 10 }}>
                  <Text
                    c="dimmed"
                    size={14}
                  >
                    {/* @ts-ignore */}
                    {`${message.userData.name} - ${moment(
                      message.created_at,
                    ).fromNow()}`}
                  </Text>
                  {isEditingMessage ? (
                    <form
                      ref={outsideClickRef}
                      onSubmit={(e): void => {
                        e.preventDefault();
                        handleEdit(message);
                      }}
                    >
                      <Textarea
                        sx={{ maxWidth: "calc(100vw - 100px)", width: 600 }}
                        autosize
                        className={classes.edit_input}
                        onChange={
                          (event): void =>
                            // eslint-disable-next-line max-len
                            // eslint-disable-next-line react/jsx-curly-newline, implicit-arrow-linebreak
                            setEditMessage(event.target.value)
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                        placeholder="Send message"
                        rightSection={sendButton()}
                        value={editMessage}
                        spellCheck="false"
                        autoComplete="off"
                      />
                    </form>
                  ) : (
                    <Text>{message.message_body}</Text>
                  )}
                </div>
              </Flex>
            </Flex>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <div className={classes.messageFunctionsDiv}>
              <MessageFunctions
                handleEdit={() => {
                  setEditMessage(message.message_body);
                  setIsEditingMessage(true);
                }}
              />
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
      ) : (
        <Flex
          key={message.id}
          mb={10}
          className={classes.messageDiv}
          justify="space-between"
        >
          <Flex>
            <div className={classes.avatarDiv}>
              <UserPopup
                user={{
                  // @ts-ignore
                  email: message.userData.email || "",
                  // @ts-ignore
                  id: message.userData.id || "",
                  // @ts-ignore
                  imageUrl: message.userData.image_url || "",
                  // @ts-ignore
                  name: message.userData.name || "",
                }}
              >
                <UserAvatarWithIndicator
                  // @ts-ignore
                  user_email={message.userData.email}
                  size={30}
                  // @ts-ignore
                  image={message.userData.image_url}
                />
              </UserPopup>
            </div>
            <div style={{ marginLeft: 10 }}>
              <Text
                c="dimmed"
                size={14}
              >
                {/* @ts-ignore */}
                {`${message.userData.name} - ${moment(
                  message.created_at,
                ).fromNow()}`}
              </Text>
              {isEditingMessage ? (
                <form
                  ref={outsideClickRef}
                  onSubmit={(e): void => {
                    e.preventDefault();
                    handleEdit(message);
                  }}
                >
                  <Textarea
                    sx={{ maxWidth: "calc(100vw - 100px)", width: 600 }}
                    autosize
                    className={classes.edit_input}
                    onChange={
                      (event): void =>
                        // eslint-disable-next-line max-len
                        // eslint-disable-next-line react/jsx-curly-newline, implicit-arrow-linebreak
                        setEditMessage(event.target.value)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    placeholder="Send message"
                    rightSection={sendButton()}
                    value={editMessage}
                    spellCheck="false"
                    autoComplete="off"
                  />
                </form>
              ) : (
                <Text>{message.message_body}</Text>
              )}
            </div>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default Message;
