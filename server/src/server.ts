import app from "./app";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5001;
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(PORT, async () => {
  try {
    // todo: connect with db

    console.log(`App running on port ${PORT}`);
  } catch (error: any) {
    // todo: handle error
  }

  process.on("unhandledRejection", (err: Error) => {
    server.close(async () => {
      // todo: disconnect from db

      process.exit(1);
    });
  });
});
