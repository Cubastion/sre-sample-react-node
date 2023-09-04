let path = require("path");
let fixture = path.join(__dirname, "../.env");
let dotenv = require('dotenv').config({ path: fixture })
let config = dotenv.parsed
module.exports = {
  WHITELIST: process.env.WHITELIST ? process.env.WHITELIST : config?.WHITELIST,
  WEBURL: process.env.WEBURL ? process.env.WEBURL : config?.WEBURL,
  PROJECT_PORT: process.env.PROJECT_PORT ? process.env.PROJECT_PORT : config?.PROJECT_PORT,
  PROJECT_HOST: process.env.PROJECT_HOST ? process.env.PROJECT_HOST : config?.PROJECT_HOST,
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : config?.NODE_ENV,
};

