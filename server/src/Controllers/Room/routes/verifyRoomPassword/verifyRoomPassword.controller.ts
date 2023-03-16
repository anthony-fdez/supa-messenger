import { supabaseClient } from "../../../../app";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import validate from "../../../../utils/middleware/validate";
import auth from "../../../../utils/middleware/auth";
import bcrypt from "bcrypt";
import verifyRoomPasswordValidator from "./verifyRoomPassword.validation";

const router: Router = express.Router();

export const verifyRoomPassword = router.post(
  "/verify-password",
  validate(verifyRoomPasswordValidator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { data: roomData, error: roomError } = await supabaseClient
      .from("room_passwords")
      .select("*")
      .eq("room_id", req.body.room_id)
      .single();

    if (!roomData || roomError) {
      return res
        .status(400)
        .json({ message: "Unable to create room password", error: roomError });
    }

    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      roomData.password,
    );

    if (!passwordsMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    res.status(200).send({ message: "You're good to go homie" });
  }),
);
