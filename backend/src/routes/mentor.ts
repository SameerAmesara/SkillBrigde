/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

mentorRouter.get("/:id", (request, response) => {
  const id = request.params.id;
  mentorService
    .getMentorById(id)
    .then((mentor) => {
      if (!mentor) {
        return response.status(404).json({ message: "Mentor not found" });
      }
      return response.send(mentor);
    })
    .catch((error) => {
      logger.error(`Failed to find mentor with ID ${id}`, error);
      return response.status(500).json({ message: "Internal server error" });
    });
});

mentorRouter.post("/", (request, response) => {
  const newMentorEntry = request.body;
  mentorService
    .addMentor(newMentorEntry)
    .then((addedEntry) => response.json(addedEntry))
    .catch((error) => logger.error("Unable to add mentor", error));
});

export default mentorRouter;
