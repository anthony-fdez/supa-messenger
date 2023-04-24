import express from "express";
import { tldrController } from "./routes/tldr";

const AiRoutes = express.Router();

AiRoutes.use("/ai", tldrController);

export default AiRoutes;
