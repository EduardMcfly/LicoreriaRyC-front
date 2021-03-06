/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_NAME: string;
    REACT_APP_API: string;
    REACT_APP_MAPS: string;
    REACT_APP_PHONE: string;
    REACT_APP_TRACKING_ID?: string;
  }
}
