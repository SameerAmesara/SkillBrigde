import { ObjectId } from "mongodb";
import { MentorshipBooking } from "../types";
import MentorshipBookingsModel from "../models/mentorshipBookings";

const addBooking = async (booking: Partial<MentorshipBooking>) => {
  const newBooking = new MentorshipBookingsModel({
    ...booking,
    id: new ObjectId(),
  });
  await newBooking.save();
  return newBooking;
};

export default {
  addBooking,
};
