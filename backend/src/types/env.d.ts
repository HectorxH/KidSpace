/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface User {
      nombres: string,
      apellidos: string,
      tipo: string,
      username: string;
      _id: string;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
      NODE_ENV: string;
      SERVER_PORT: string;
      PUSHER_APPID: string;
      PUSHER_KEY: string;
      PUSHER_SECRET: string;
      PUSHER_CLUSTER: string;
      MONGO_USER: string;
      MONGO_PASS: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
    }
  }
}
export {};
