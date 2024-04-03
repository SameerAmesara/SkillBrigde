import {
  BookMentor,
  BookingDetails,
  MentorDetails,
} from "./../models/BookMentor.model";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

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
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
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
    };
  }
}
