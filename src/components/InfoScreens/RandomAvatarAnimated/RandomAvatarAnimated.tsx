import { Avatar, Transition } from "@mantine/core";
import React, { useEffect, useState } from "react";
import constants from "../../../constants/constants";

interface Props {
  size: number;
}

const RandomAvatarAnimated = ({ size }: Props): JSX.Element => {
  const [seed, setSeed] = useState(Math.random() * 1000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(Math.random() * 1000);
      setMounted(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [seed, mounted]);

  useEffect(() => {
    if (!mounted) {
      setTimeout(() => {
        setMounted(true);
      }, 200);
    }
  }, [mounted]);

  return (
    <Transition
      mounted={mounted}
      transition="pop"
    >
      {(styles) => (
        <Avatar
          style={styles}
          radius="50%"
          size={size}
          src={constants.avatarPlaceholder(seed)}
        />
      )}
    </Transition>
  );
};

export default RandomAvatarAnimated;
