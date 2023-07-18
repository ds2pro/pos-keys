import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    DB_NAME: str(),
    DB_HOST: str(),
    DB_PORT: port(),
    DB_USER: str(),
    DB_PASS: str(),
  });
};

export default validateEnv;
