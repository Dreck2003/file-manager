import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  DB: {
    PORT: process.env.DB_PORT || 5432,
    NAME: process.env.DB_NAME || "test",
    USER: process.env.DB_USER || "postgres",
  },
  PORT: process.env.PORT || 3001,
  AWS: {
    KEY: process.env.AWS_KEY,
    SECRET: process.env.AWS_SECRET,
    BUCKET: process.env.AWS_BUCKET,
  },
  EMAIL: {
    FROM: process.env.EMAIL_FROM,
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },
  SECRET: process.env.JWT_SECRET,
  UNSPLASH: {
    ACCESS_KEY: process.env.UNSPLASH_ACCES_KEY,
  },
  BASE_URL: process.env.BASE_URL || "http://localhost:3001",
};
