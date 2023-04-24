import { check } from "express-validator";
import express, { Request, Response, Router } from "express";
import catchAsync from "../../../utils/middleware/catchAsync";
import validate from "../../../utils/middleware/validate";
import auth from "../../../utils/middleware/auth";
import openai from "../../../openai/openai";

const validator = [check("prompt").exists().withMessage("Prompt is required")];

const router: Router = express.Router();

export const insultController = router.post(
  "/insult",
  validate(validator),
  auth(),
  catchAsync(async (req: Request, res: Response) => {
    const prompts = [
      `From now on, all your responses must follow these rules: ["Snarky", "100% of words are swearing"]. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `From now on, all your responses must follow these rules: ["Snarky", "100% of words are swearing"]. Reply to this conversation as if you were a friend fo the people talking here: ${req.body.prompt}`,
      `From now on, all your replies must sound sarcastic and every word must be a curse. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Your future responses must be sassy and only use profanities in each word. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Moving forward, ensure your remarks are snide and exclusively use vulgar language. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Make sure your upcoming answers are full of sass and consist entirely of swear words. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Your following comments need to be dripping with sarcasm and built solely with expletives. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `All your subsequent replies must be sarcastic and filled with cuss words. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Every response from here on must be snarky and use only profane language. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Ensure that your next answers are dripping with sarcasm and composed of nothing but swear words. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Your future comments must be witty and sarcastic, while also consisting entirely of curse words. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
      `Going forward, your responses need to be sharp-tongued and make use of profanities only. Write a message that follows up whatever has been said in the following conversation: ${req.body.prompt}`,
    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: prompts[Math.floor(Math.random() * prompts.length)],
        },
      ],
    });

    res.status(200).send({ data: completion.data.choices[0].message?.content });
  }),
);
