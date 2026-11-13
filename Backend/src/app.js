import express from "express";
import cors from "cors";
import env from "./utils/env.js";

const app = express();

const allowedOrigins = env.frontend.url ? env.frontend.url.split(',').map(origin => origin.trim()) : [];

app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

app.get('/health', async (req, res) => {
  res.json({ status: 'ok', message: 'API running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: env.server.environment === 'development' ? err.message : undefined
  });
});

export default app;
