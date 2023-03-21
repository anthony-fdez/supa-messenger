import { createPrivateRoomController } from "./routes/createPrivateRoom.controller";
import { verifyRoomPassword } from "./routes/verifyRoomPassword.controller";
import express from "express";

const RoomRoutes = express.Router();

RoomRoutes.use("/room", createPrivateRoomController);
RoomRoutes.use("/room", verifyRoomPassword);

export default RoomRoutes;
