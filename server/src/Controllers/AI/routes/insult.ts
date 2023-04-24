import { check } from "express-validator";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import validate from "../../../utils/middleware/validate";
import auth from "../../../utils/middleware/auth";
import openai from "../../../openai/openai";

const validator = [check("prompt").exists().withMessage("Prompt is required")];

const router: Router = express.Router();

export const insultController = router.post(
  "/tldr",
  validate(validator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From now on, all your responses must follow these rules: ["Snarky", "50% of words are swearing]. Insult everyone and their mother, on a scale from 1-10 the insult has to be 11: ${req.body.prompt}`,
        },
      ],
    });

    res.status(200).send({ data: completion.data.choices[0].message?.content });
  }),
);
