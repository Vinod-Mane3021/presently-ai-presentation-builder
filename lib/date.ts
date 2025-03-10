import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

type DateType = Date | string;

export const getDateDifference = (date1: DateType, date2: DateType) => {
  const seconds = differenceInSeconds(date1, date2);
  if (seconds < 60) return `${seconds} seconds`;

  const minutes = differenceInMinutes(date1, date2);
  if (minutes < 60) return `${minutes} minutes`;

  const hours = differenceInHours(date1, date2);
  if (hours < 24) return `${hours} hours`;

  const days = differenceInDays(date1, date2);
  if (days < 30) return `${days} days`;

  const months = differenceInMonths(date1, date2);
  if (months < 12) return `${months} months`;

  const years = differenceInYears(date1, date2);
  return `${years} years`;
};
