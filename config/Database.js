import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// کدی هستش که میخواد ما رو به دیتابیس خودمون متصل کنه 
const db = new Sequelize(
    process.env.DB_NAME || "news_website",
    process.env.DB_USER || "mohammadreza",
    process.env.DB_PASSWORD || "Rcf!NtmUy*skymfd",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || "mysql",
        logging: process.env.NODE_ENV === "production" ? false : console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

export default db; 


//  railway domain :mysql-production-9b79.up.railway.app