import * as dotenv from "dotenv";
dotenv.config();

export const envs = {
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  APP_PORT: +process.env.APP_PORT || 3000,
  DATABASE_PORT: +process.env.DATABASE_PORT || 1433,
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
  DATABASE_USER: process.env.DATABASE_USER || "sa",
  DATABASE_PASSWORD: `${process.env.DATABASE_PASSWORD || "1234567*"}`,
  DATABASE_NAME: process.env.DATABASE_NAME || "template",
};
