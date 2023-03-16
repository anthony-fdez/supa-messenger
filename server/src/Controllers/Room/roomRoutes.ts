import { verifyRoomPassword } from "./routes/verifyRoomPassword/verifyRoomPassword.controller";
import { createPrivateRoomController } from "./routes/createPrivateroom/createPrivateRoom.controller";
import express from "express";

const RoomRoutes = express.Router();

RoomRoutes.use("/room", createPrivateRoomController);
RoomRoutes.use("/room", verifyRoomPassword);

export default RoomRoutes;
