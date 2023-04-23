import { Flex, Skeleton } from "@mantine/core";
import React from "react";

const LoadingRoomData = (): JSX.Element => {
  return (
    <div>
      <Skeleton
        mt={20}
        height={50}
        width="100%"
      />
      <Flex mt={50}>
        <Skeleton
          circle
          height={30}
          width="100%"
        />
        <Skeleton
          height={30}
          ml={10}
          width="40%"
        />
      </Flex>
      <Flex mt={20}>
        <Skeleton
          circle
          height={30}
          width="100%"
        />
        <Skeleton
          height={30}
          ml={10}
          width="20%"
        />
      </Flex>
      <Flex mt={20}>
        <Skeleton
          circle
          height={30}
          width="100%"
        />
        <Skeleton
          height={30}
          ml={10}
          width="60%"
        />
      </Flex>
      <Flex mt={20}>
        <Skeleton
          circle
          height={30}
          width="100%"
        />
        <Skeleton
          height={30}
          ml={10}
          width="50%"
        />
      </Flex>
    </div>
  );
};

export default LoadingRoomData;
