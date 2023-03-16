import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

//handles async  await promises
export = (
    func: (
      arg0: Request<
        ParamsDictionary,
        unknown,
        unknown,
        ParsedQs,
        Record<string, unknown>
      >,
      arg1: Response<unknown, Record<string, unknown>>,
      arg2: NextFunction,
    ) => unknown,
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);
