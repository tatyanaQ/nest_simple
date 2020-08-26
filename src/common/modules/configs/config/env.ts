import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: +process.env.PORT || 3000,
  TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION || "mysql",
  TYPEORM_HOST: process.env.TYPEORM_HOST || "localhost",
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME || "admin",
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD || "admin",
  TYPEORM_DATABASE: process.env.TYPEORM_DATABASE || "nest",
  TYPEORM_PORT: +process.env.TYPEORM_PORT || 3306,
  TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE === 'true',
  TYPEORM_LOGGING: process.env.TYPEORM_LOGGING === 'true',
  TYPEORM_ENTITIES: process.env.TYPEORM_ENTITIES || "./dist/src/**/entities/*.js",
  TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS || "./dist/migrations/*.js",
  TYPEORM_MIGRATIONS_DIR: process.env.TYPEORM_MIGRATIONS_DIR || "migrations",

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};