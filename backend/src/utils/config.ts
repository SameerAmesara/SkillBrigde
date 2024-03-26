import dotenv from 'dotenv'
import mongoose from 'mongoose';
import logger from './logger';
dotenv.config()
const MONGO_URI = process.env.MONGO_URI!
const PORT = process.env.PORT || 8000

export function connectToDatabase() {
    mongoose.connect(MONGO_URI)
        .then(() => logger.info('Successfully connected to database'))
        .catch(error => logger.error("Unable to connect to mongo", error))
}

export default {
    connectToDatabase, PORT
}