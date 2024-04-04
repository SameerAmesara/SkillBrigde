import { ObjectId } from "mongodb";
import { MentorshipBooking, MentorshipBookingItem } from "../types";
import MentorshipBookingsModel from "../models/mentorshipBookings";
import logger from "../utils/logger";
import MentorModel from "../models/mentor";

const addBooking = async (booking: Partial<MentorshipBooking>) => {
  const newBooking = new MentorshipBookingsModel({
    ...booking,
    id: new ObjectId(),
  });
  await newBooking.save();
  return newBooking;
};

const fetchBookings = async (
  userId: string
): Promise<MentorshipBookingItem[]> => {
  try {
    const bookings = await MentorshipBookingsModel.find({ userId })
      .sort({ date: -1 })
      .exec();

    const bookingsWithMentorDetails = await Promise.all(
      bookings.map(async (booking) => {
        const mentor = await MentorModel.findOne({
          id: booking.mentorId,
        });

        const bookingDetails: MentorshipBooking = {
          ...booking.toObject(),
        };

        return {
          ...bookingDetails,
          mentorName: `${mentor?.firstName ?? ""} ${mentor?.lastName ?? ""}`,
          mentorImg: mentor?.imageUrl ?? "",
        };
      })
    );
    return bookingsWithMentorDetails;
  } catch (error: unknown) {
    logger.error(error);
    throw new Error("Unable to fetch mentor bookings.");
  }
};

export default {
  addBooking,
  fetchBookings,
};
