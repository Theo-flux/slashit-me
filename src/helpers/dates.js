import moment, { format } from 'moment-timezone';

export const addDays = (days, format) => {
  return moment(new Date()).add(days, 'days').format(format);
};
