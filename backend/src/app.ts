import { connectToDatabase } from './utils/config'
import express from 'express'
import cors from 'cors'
import middleware from './utils/middleware'
import userRouter from './routes/userDetails';
import discussionRouter from './routes/discussion';

const app = express()

connectToDatabase()

app.use(cors())
app.use(express.json())
app.use(middleware.morganMiddleWare)

app.use('/userDetails/', userRouter);
app.use('/discussions', discussionRouter);

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app;