import { supabaseClient } from "./../../../app";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import validate from "../../../utils/middleware/validate";
import createPrivateRoomValidator from "./createPrivateRoom.validation";
import auth from "../../../utils/middleware/auth";
import bcrypt from "bcrypt";

const router: Router = express.Router();

export const createPrivateRoomController = router.post(
  "/create-private-room",
  validate(createPrivateRoomValidator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore

    const { data: sessionData, error: sessionError } =
      await supabaseClient.auth.getSession();

    console.log(sessionData);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { data, error } = await supabaseClient.from("room_passwords").insert({
      room_id: req.body.room_id,
      password: hashedPassword,
    });

    console.log(data);
    console.log(error);

    res.status(200).send({ message: "Looking goood" });
  }),
);
