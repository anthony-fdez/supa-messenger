import { createPrivateRoomController } from "./../../Controllers/Room/routes/createPrivateRoom.controller";
import express from "express";

const RoomRoutes = express.Router();

RoomRoutes.use("/room", createPrivateRoomController);

export default RoomRoutes;
