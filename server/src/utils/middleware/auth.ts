import { supabaseClient } from "./../../app";
import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";

const auth = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<unknown> => {
    const jwt = req.body.jwt;

    if (!jwt)
      return res
        .status(400)
        .json({ message: "Access & Refresh Token token required" });

    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser(jwt);

    // @ts-ignore
    req.user = user;

    if (!user || error) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return next();
  };
};

export default auth;
