let path = require("path");
const fs = require('fs');
// const ca = fs.readFileSync(path.join(__dirname + '/../ssl_certs/db.cert.pem')).toString();
// const prod_ca = fs.readFileSync(path.join(__dirname + '/../ssl_certs/prod_db.cert.pem')).toString();
let fixture = path.join(__dirname, "../.env");
let dotenv = require('dotenv').config({ path: fixture })
let config = dotenv.parsed
module.exports = {
    local: {
        username: process.env.DBUSERNAME ? process.env.DBUSERNAME : config?.DBUSERNAME,
        password: process.env.PASSWORD ? process.env.PASSWORD : config?.PASSWORD,
        database: process.env.DBNAME ? process.env.DBNAME : config?.DBNAME,
        host: process.env.HOST ? process.env.HOST : config?.HOST,
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000,
        },
    },
    // development: {
    //     username: process.env.DBUSERNAME ? process.env.DBUSERNAME :config?.DBUSERNAME,
    //     password: process.env.PASSWORD? process.env.PASSWORD :config?.PASSWORD,
    //     database: process.env.DBNAME? process.env.DBNAME :config?.DBNAME,
    //     host: process.env.HOST? process.env.HOST :config?.HOST,
    //     port: 3306,
    //     dialect:'mysql',
    //     ssl:true,
    //     dialectOptions: {
    //         bigNumberStrings: true,
    //         ssl: {
    //             ca: ca,
    //         }
    //     },
    //     pool: {
    //         max: 5,
    //         min: 0,
    //         acquire: 60000,
    //         idle: 10000,
    //     },
    // },
    // production: {
    //     username: process.env.DBUSERNAME ? process.env.DBUSERNAME :config?.DBUSERNAME,
    //     password: process.env.PASSWORD? process.env.PASSWORD :config?.PASSWORD,
    //     database: process.env.DBNAME? process.env.DBNAME :config?.DBNAME,
    //     host: process.env.HOST? process.env.HOST :config?.HOST,
    //     port: 3306,
    //     dialect:'mysql',
    //     ssl:true,
    //     dialectOptions: {
    //         bigNumberStrings: true,
    //         ssl: {
    //             ca: prod_ca,
    //         }
    //     },
    //     pool: {
    //         max: 5,
    //         min: 0,
    //         acquire: 60000,
    //         idle: 10000,
    //     },
    // },
};