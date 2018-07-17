import { Meteor } from 'meteor/meteor';

export default (exception) => {
  const message =
    (exception.sanitizedError && exception.sanitizedError.message)
      ? exception.sanitizedError.message
      : exception.message || exception.reason || exception;

  throw new Meteor.Error(500, message);
};
