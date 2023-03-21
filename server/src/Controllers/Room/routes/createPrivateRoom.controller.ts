import { check } from "express-validator";
import { supabaseClient } from "../../../app";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import validate from "../../../utils/middleware/validate";
import auth from "../../../utils/middleware/auth";
import bcrypt from "bcrypt";

const validator = [
  check("room_id").exists().withMessage("Room id is required"),
  check("password").exists().withMessage("Room password is required"),
];

const router: Router = express.Router();

export const createPrivateRoomController = router.post(
  "/create-private-room",
  validate(validator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { data, error } = await supabaseClient.from("room_passwords").insert({
      room_id: req.body.room_id,
      password: hashedPassword,
      created_by: null,
    });

    if (error) {
      return res
        .status(400)
        .json({ message: "Unable to create room password", error: error });
    }

    res.status(200).send({ message: "Room password created" });
  }),
);
