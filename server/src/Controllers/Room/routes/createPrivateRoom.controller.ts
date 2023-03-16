import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import validate from "../../../utils/middleware/validate";
import createPrivateRoomValidator from "./createPrivateRoom.validation";

const router: Router = express.Router();

export const createPrivateRoomController = router.post(
  "/create-private-room",
  validate(createPrivateRoomValidator),

  catchAsync(async (req: Request, res: Response) => {
    res.status(200).send({ message: "Looking goood" });
  }),
);
