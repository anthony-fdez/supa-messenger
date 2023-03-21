import { createClient } from "@supabase/supabase-js";
/* eslint-disable @typescript-eslint/no-explicit-any */
require("dotenv").config();

import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Routers
import RoomRoutes from "./Controllers/Room/roomRoutes";
import error from "./utils/middleware/errors";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // Limit each IP to 20 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: async (req: Request, res: Response) => {
    return res
      .status(429)
      .json({ status: "Error", message: "Request limit reached" });
  },
});

const app = express();

export const supabaseClient = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_KEY || "",
);

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter);
app.use(RoomRoutes);
app.use(error);

export default app;
