import { Button, Flex } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import useGlobalStore from "../store/useGlobalStore";

const useHandleSignout = (): {
  handleSignout: () => Promise<void>;
  isLoadingSignout: boolean;
} => {
  const supabase = useSupabaseClient();
  const { clearState } = useGlobalStore();

  const [isLoadingSignout, setIsLoadingSignout] = useState(false);

  const signOut = async (): Promise<void> => {
    setIsLoadingSignout(true);

    const { error } = await supabase.auth.signOut();

    clearState();
    setIsLoadingSignout(false);

    if (error) {
      openModal({
        title: "Error",
        children: (
          <>
            <p>
              There was an error when trying to log you out, please try again in
              a few minutes.
            </p>
            <Flex
              justify="end"
              mt={20}
            >
              <Button onClick={(): void => closeAllModals()}>Ok</Button>
            </Flex>
          </>
        ),
      });
    }
  };

  const handleSignout = async (): Promise<void> => {
    setIsLoadingSignout(true);

    signOut();
  };

  return { handleSignout, isLoadingSignout };
};

export default useHandleSignout;
