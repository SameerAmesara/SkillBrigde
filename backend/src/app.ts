import { connectToDatabase } from "./utils/config";
import contentFeedRouter from "./routes/contentFeed";
import express from "express";
import cors from "cors";
import middleware from "./utils/middleware";
import mentorRouter from "./routes/mentor";
import userRouter from "./routes/userDetails";
import discussionRouter from "./routes/discussion";
import paymentsRouter from "./routes/payments";
import jobRouter from "./routes/job";
import bodyParser from "body-parser";

const app = express();

connectToDatabase();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(middleware.morganMiddleWare);

app.use("/contentfeed", contentFeedRouter);
app.use("/mentor", mentorRouter);
app.use("/userDetails/", userRouter);
app.use("/discussions", discussionRouter);
app.use("/payments", paymentsRouter);
app.use("/job", jobRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
