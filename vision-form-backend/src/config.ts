import * as dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  DATABASE_URL
} = process.env;

const appConfig = {
  PORT: PORT ?? 5000,
  DATABASE_URL
};
export default appConfig;
