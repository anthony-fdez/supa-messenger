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
    const refreshToken = req.body.refreshToken;

    console.log(jwt);
    console.log(refreshToken);

    if (!jwt || !refreshToken)
      return res
        .status(400)
        .json({ message: "Access & Refresh Token token required" });

    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser(jwt);

    if (!user || error) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await supabaseClient.auth.setSession({
      access_token: jwt,
      refresh_token: refreshToken,
    });

    return next();
  };
};

export default auth;
