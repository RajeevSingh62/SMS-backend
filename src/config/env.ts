import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  PAYU_KEY:string;
PAYU_SALT:string;
FRONTEND_URL:string;
BACKEND_URL:string;
  OPENAI_API_KEY:string;
}

export const ENV: EnvConfig = {
  PORT: parseInt(process.env.PORT || "5000"),
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN as string) || "7d",
  CLOUDINARY_CLOUD_NAME: (process.env.CLOUDINARY_CLOUD_NAME as string),
  CLOUDINARY_API_KEY:( process.env.CLOUDINARY_API_KEY as string),
  CLOUDINARY_API_SECRET: (process.env.CLOUDINARY_API_SECRET as string),
  OPENAI_API_KEY:(process.env.OPENAI_API_KEY as string),
  PAYU_KEY: (process.env.PAYU_KEY as string),
  PAYU_SALT: (process.env.PAYU_SALT as string),
  FRONTEND_URL:process.env.FRONTEND_URL as string,
  BACKEND_URL:process.env.BACKEND_URL as string


};

// password of mongo =r98a2FDwOIKKoja1
