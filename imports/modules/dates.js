import moment from 'moment';
import 'moment-timezone';

export const monthDayYear = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('MMMM Do, YYYY') :
    moment(timestamp).tz(timezone).format('MMMM Do, YYYY')
);

export const monthDayYearAtTime = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('MMMM Do, YYYY [at] hh:mm a') :
    moment(timestamp).tz(timezone).format('MMMM Do, YYYY [at] hh:mm a')
);

export const timeago = (timestamp, timezone) => (
  !timezone ? moment(timestamp).fromNow() :
    moment(timestamp).tz(timezone).fromNow()
);

export const add = (timestamp, amount, range, timezone) => (
  !timezone ? moment(timestamp).add(amount, range).format() :
    moment(timestamp).tz(timezone).add(amount, range).format()
);

export const year = (timestamp, timezone) => (
  !timezone ? moment(timestamp).format('YYYY') :
    moment(timestamp).tz(timezone).format('YYYY')
);
