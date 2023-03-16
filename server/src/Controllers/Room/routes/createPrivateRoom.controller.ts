import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";

const router: Router = express.Router();

export const createPrivateRoomController = router.post(
  "/create-private-room",
  catchAsync(async (req: Request, res: Response) => {
    res.status(200).send({ message: "Looking goood" });
  }),
);
