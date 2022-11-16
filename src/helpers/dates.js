import moment, { format } from 'moment-timezone';

export const addDays = (days, format) => {
  moment(new Date(), format).add(days, 'days');
};

