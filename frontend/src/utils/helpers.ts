import { Dayjs } from "dayjs";
import { Availability } from "../models/BookMentor.model";

export const formatDate = (dateValue: Date) => {
  const date = new Date(dateValue);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");
  const paddedHour = hour.toString().padStart(2, "0");
  const paddedMinute = minute.toString().padStart(2, "0");

  return `${paddedMonth}/${paddedDay}/${year} ${paddedHour}:${paddedMinute}`;
};

export const getDayNumber = (day: string) => {
  switch (day.toLowerCase()) {
    case "sunday":
      return 0;
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    case "friday":
      return 5;
    case "saturday":
      return 6;
    default:
      return -1;
  }
};

export const generateTimeSlots = (
  date: Dayjs,
  availabilities: Availability[]
): string[] => {
  const dayOfWeek = date.format("dddd");
  const availability = availabilities.find((avail) => avail.day === dayOfWeek);

  if (!availability) {
    return [];
  }

  const startTimeParts = availability.startTime.split(":").map(Number);
  const endTimeParts = availability.endTime.split(":").map(Number);

  const startTime = date
    .set("hour", startTimeParts[0])
    .set("minute", startTimeParts[1]);
  const endTime = date
    .set("hour", endTimeParts[0])
    .set("minute", endTimeParts[1]);

  const timeSlots: string[] = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    timeSlots.push(currentTime.format("HH:mm"));
    currentTime = currentTime.add(1, "hour");
  }

  return timeSlots;
};
