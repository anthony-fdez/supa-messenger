import express from "express";
import { tldrController } from "./routes/tldr";
import { insultController } from "./routes/insult";

const AiRoutes = express.Router();

AiRoutes.use("/ai", tldrController);
AiRoutes.use("/ai", insultController);

export default AiRoutes;
