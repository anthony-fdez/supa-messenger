import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";

const auth = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<unknown> => {
    console.log(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ code: 400, errors: errors.array() });
  };
};

export default auth;
