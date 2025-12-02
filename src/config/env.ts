import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

export const ENV: EnvConfig = {
  PORT: parseInt(process.env.PORT || "5000"),
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN as string) || "7d",
};



// password of mongo =r98a2FDwOIKKoja1