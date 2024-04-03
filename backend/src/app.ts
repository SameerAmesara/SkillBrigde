import { connectToDatabase } from './utils/config'
<<<<<<< Updated upstream
import contentFeedRouter from './routes/contentFeed'
import express from "express";
import cors from "cors";
import middleware from "./utils/middleware";
import mentorRouter from "./routes/mentor";
import userRouter from "./routes/userDetails";
import discussionRouter from "./routes/discussion";
import paymentsRouter from "./routes/payments";
=======
import express from 'express'
import cors from 'cors'
import middleware from './utils/middleware'
import userRouter from './routes/userDetails';
import discussionRouter from './routes/discussion';
import jobRouter from './routes/job';
>>>>>>> Stashed changes

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(middleware.morganMiddleWare);

<<<<<<< Updated upstream
app.use("/user", userRouter);
app.use("/contentfeed" , contentFeedRouter)
app.use("/mentor", mentorRouter);
app.use("/userDetails/", userRouter);
app.use("/discussions", discussionRouter);
app.use("/payments", paymentsRouter);
=======
app.use('/userDetails/', userRouter);
app.use('/discussions', discussionRouter);
app.use('/job', jobRouter)
>>>>>>> Stashed changes

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

<<<<<<< Updated upstream
export default app;
=======
export default app
>>>>>>> Stashed changes
