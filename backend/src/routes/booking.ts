import express, { Request, Response } from "express";
import mentorshipBookingsService from "../services/mentorshipBookingsService";
import { MentorshipBooking } from "../types";

const router = express.Router();

router.post("/book-mentor", async (req: Request, res: Response) => {
  try {
    const { date, time, mentorId, transactionId, userId } =
      req.body as MentorshipBooking;
    const response = await mentorshipBookingsService.addBooking({
      date,
      time,
      mentorId,
      transactionId,
      userId,
    });
    return res.status(201).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
