/**
 * Formats a string or Date instance to a 'day monthName year' string format.
 * @param time
 */
export const formatDate = (time: string | Date): string => {
  const date = time instanceof Date ? time : new Date(time);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
};
