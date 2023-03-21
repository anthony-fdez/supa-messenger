import { check } from "express-validator";
import { supabaseClient } from "../../../app";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import validate from "../../../utils/middleware/validate";
import auth from "../../../utils/middleware/auth";
import bcrypt from "bcrypt";

const router: Router = express.Router();

const validator = [
  check("room_id").exists().withMessage("Room id is required"),
  check("password").exists().withMessage("Room password is required"),
];

export const verifyRoomPassword = router.post(
  "/verify-password",
  validate(validator),
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
        .json({ message: "Unable verify room password", error: roomError });
    }

    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      roomData.password,
    );

    if (!passwordsMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const { error } = await supabaseClient.from("participants").insert({
      // @ts-ignore
      user_id: req.user.id,
      room_id: req.body.room_id,
    });

    if (error) {
      return res
        .status(400)
        .send({ message: "Unable to verify room password", error });
    }

    res.status(200).send({ message: "You're good to go homie" });
  }),
);
