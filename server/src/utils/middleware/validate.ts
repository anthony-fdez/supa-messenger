import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<unknown> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ code: 400, errors: errors.array() });
  };
};

export default validate;
