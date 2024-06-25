import moment from 'moment';

export function validateEmailUPN(email: string) {
  const domain = '.upnjatim.ac.id';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation

  if (typeof email !== 'string') {
    return false;
  }

  return emailRegex.test(email) && email.endsWith(domain);
}

export function formatDates(startDate: Date, endDate: Date): string {
  // Set the locale to Indonesian
  moment.locale('id');

  const start = moment(startDate);
  const end = moment(endDate);

  // Check if the start and end dates are in the same year
  if (start.year() === end.year()) {
    // If in the same year, format without showing the year in the start date
    return `${start.format('D MMMM')} - ${end.format('D MMMM YYYY')}`;
  } else {
    // If in different years, show the full date for both
    return `${start.format('D MMMM YYYY')} - ${end.format('D MMMM YYYY')}`;
  }
}
