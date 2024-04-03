import { Dayjs } from "dayjs";

export interface BookingDetails {
  date: Dayjs | null;
  time: string;
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface MentorDetails {
  availability: Availability[];
  hourlyRate: number;
  name: string;
  bio: string;
  id: string;
}

export interface BookMentor {
  mentorDetails: MentorDetails;
  bookingDetails: BookingDetails;
}
