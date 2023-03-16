import { supabaseClient } from "../../../../app";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import validate from "../../../../utils/middleware/validate";
import createPrivateRoomValidator from "./createPrivateRoom.validation";
import auth from "../../../../utils/middleware/auth";
import bcrypt from "bcrypt";

const router: Router = express.Router();

export const createPrivateRoomController = router.post(
  "/create-private-room",
  validate(createPrivateRoomValidator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      process.env.SALT_ROUNDS || 5,
    );

    const { data, error } = await supabaseClient.from("room_passwords").insert({
      room_id: req.body.room_id,
      password: hashedPassword,
    });

    if (!data || error) {
      return res
        .status(400)
        .json({ message: "Unable to create room password", error: error });
    }

    res.status(200).send({ message: "Room password created" });
  }),
);
