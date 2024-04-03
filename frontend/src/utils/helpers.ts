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
