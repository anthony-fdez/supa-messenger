import { check } from "express-validator";

const createPrivateRoomValidator = [
  check("email").exists(),
  check("password").exists(),
];

export default createPrivateRoomValidator;
