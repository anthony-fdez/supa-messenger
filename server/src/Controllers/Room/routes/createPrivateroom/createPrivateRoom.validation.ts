import { check } from "express-validator";

const createPrivateRoomValidator = [
  check("room_id").exists().withMessage("Room id is required"),
  check("password").exists().withMessage("Room password is required"),
];

export default createPrivateRoomValidator;
