import dotenv from 'dotenv';

dotenv.config();

// DECLARE ALL VARIABLES
const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@growthhub.vf4h0im.mongodb.net/growthhub`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

//CREATE CONFIG OBJECT
const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};

config.mongo.url = MONGO_URL;
config.server.port = SERVER_PORT;


//EXPORT
export default config;