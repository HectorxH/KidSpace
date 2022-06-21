/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      SERVER_PORT: string;
      PUSHER_APPID: string;
      PUSHER_KEY: string;
      PUSHER_SECRET: string;
      PUSHER_CLUSTER: string;
      MONGO_USER: string;
      MONGO_PASS: string;
    }
  }
}
export {};
