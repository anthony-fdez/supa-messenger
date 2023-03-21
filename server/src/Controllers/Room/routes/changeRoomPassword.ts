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

export const changeRoomPasswordController = router.post(
  "/change-room-password",
  validate(validator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { data, error } = await supabaseClient
      .from("room_passwords")
      .update({
        password: hashedPassword,
      })
      .match({
        room_id: req.body.room_id,
        // @ts-ignore
        created_by: req.user.id,
      });

    if (error) {
      return res
        .status(400)
        .json({ message: "Unable to update room password", error: error });
    }

    res.status(200).send({ message: "Room password updated" });
  }),
);
