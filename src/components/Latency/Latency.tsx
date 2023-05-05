import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { Badge, Tooltip } from "@mantine/core";
import { Database } from "../../../types/database.types";

const Latency = () => {
  const supabase = useSupabaseClient<Database>();

  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const channel = supabase
      .channel("calc-latency", {
        config: {
          broadcast: { ack: true },
        },
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          interval = setInterval(async () => {
            const begin = performance.now();

            await channel.send({
              type: "broadcast",
              event: "latency",
              payload: {},
            });

            const end = performance.now();

            console.log(`Latency is ${end - begin} milliseconds`);
            setLatency(end - begin);
          }, 5000);
        }
      });

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip
      withinPortal
      withArrow
      label="Server latency in milliseconds"
    >
      <Badge
        variant="outline"
        mr={10}
      >
        {latency ? `${latency}ms` : "Loading..."}
      </Badge>
    </Tooltip>
  );
};

export default Latency;
