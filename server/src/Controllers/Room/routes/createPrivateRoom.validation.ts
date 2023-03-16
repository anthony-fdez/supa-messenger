import { check } from "express-validator";

const createPrivateRoomValidator = [
  check("jwt").exists().withMessage("jwt required"),
];

export default createPrivateRoomValidator;
