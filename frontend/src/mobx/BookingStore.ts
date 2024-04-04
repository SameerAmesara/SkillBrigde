import {
  BookMentor,
  BookingDetails,
  MentorBooking,
  MentorDetails,
} from "./../models/BookMentor.model";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
const BOOKING_URL = `${BASE_URL}/bookings`;

export class BookingStore {
  rootStore: RootStore;
  bookMentor: BookMentor = {
    mentorDetails: {
      availability: [],
      bio: "",
      hourlyRate: 0,
      name: "",
      id: "",
    },
    bookingDetails: { date: null, time: "" },
    bookingSuccessFull: false,
  };
  mentorBookings: MentorBooking[] = [];
  isBookingsLoading = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async addMentorBooking(transactionId: string) {
    const userId = sessionStorage.getItem("userId");
    try {
      const response = await axios.post(`${BOOKING_URL}/book-mentor`, {
        date: this.bookMentor.bookingDetails.date,
        time: this.bookMentor.bookingDetails.time,
        userId,
        transactionId,
        mentorId: this.bookMentor.mentorDetails.id,
      });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.data) {
        const { message } = axiosError.response.data;
        throw new Error(message);
      } else {
        throw new Error("Failed to book mentor");
      }
    }
  }

  async fetchMentorBookings() {
    const userId = sessionStorage.getItem("userId");
    this.isBookingsLoading = true;
    await axios
      .get<MentorBooking[]>(`${BOOKING_URL}/fetch/${userId}`)
      .then((response) => {
        this.mentorBookings = [...response.data];
      })
      .catch((error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data) {
          const { message } = axiosError.response.data;
          throw new Error(message);
        } else {
          throw new Error("Failed to fetch mentor bookings");
        }
      });
    this.isBookingsLoading = false;
  }

  updateBookingDetails(bookingDetails: Partial<BookingDetails>) {
    this.bookMentor.bookingDetails = {
      ...this.bookMentor.bookingDetails,
      ...bookingDetails,
    };
  }

  updateMentorDetails(mentorDetails: Partial<MentorDetails>) {
    this.bookMentor.mentorDetails = {
      ...this.bookMentor.mentorDetails,
      ...mentorDetails,
    };
  }

  resetBookMentor() {
    this.bookMentor = {
      mentorDetails: {
        availability: [],
        bio: "",
        hourlyRate: 0,
        name: "",
        id: "",
      },
      bookingDetails: { date: null, time: "" },
      bookingSuccessFull: false,
    };
  }
}
