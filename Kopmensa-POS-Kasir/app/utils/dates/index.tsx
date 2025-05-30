import moment from "moment";

export const dateParser = (date: string | Date, format: string): string => {
  return moment(date).format(format);
};

export const formatMonthYear = (date: Date): string => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month}, ${year}`;
};
