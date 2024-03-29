import express from "express";
import mentorService from "../services/mentorService";
import logger from "../utils/logger";

const mentorRouter = express.Router();

mentorRouter.get("/", (_request, response) => {
  mentorService
    .getAll()
    .then((mentors) => response.send(mentors))
    .catch((error) => logger.error("Unable to fetch mentors", error));
});

mentorRouter.post("/", (request, response) => {
  const newMentorEntry = request.body;
  mentorService
    .addMentor(newMentorEntry)
    .then((addedEntry) => response.json(addedEntry))
    .catch((error) => logger.error("Unable to add mentor", error));
});

export default mentorRouter;
