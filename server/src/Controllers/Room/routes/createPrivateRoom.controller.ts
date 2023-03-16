import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import validate from "../../../utils/middleware/validate";
import createPrivateRoomValidator from "./createPrivateRoom.validation";
import auth from "../../../utils/middleware/auth";

const router: Router = express.Router();

export const createPrivateRoomController = router.post(
  "/create-private-room",
  validate(createPrivateRoomValidator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    console.log(req.user);

    res.status(200).send({ message: "Looking goood" });
  }),
);
