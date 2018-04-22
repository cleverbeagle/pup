import handlebars from 'handlebars';
import juice from 'juice';
import { Meteor } from 'meteor/meteor';
import getPrivateFile from './get-private-file';

export default (handlebarsMarkup, context, options) => {
  if (handlebarsMarkup && context) {
    const template = handlebars.compile(handlebarsMarkup);
    const content = template(context);
    const {
      productName, twitterUsername, facebookUsername, productAddress,
    } = Meteor.settings.public;

    if (options && options.noBaseTemplate) {
      // Use juice to inline CSS <style></style> styles from <head> unless disabled.
      return options && !options.inlineCss ? content : juice(content);
    }

    const base = handlebars.compile(getPrivateFile('email-templates/base.html'));

    const baseContext = {
      ...context,
      content,
      productName,
      twitterUsername,
      facebookUsername,
      productAddress,
    };

    return options && !options.inlineCss ? base(baseContext) : juice(base(baseContext));
  }

  throw new Error('[Pup] Please pass Handlebars markup to compile and a context object with data mapping to the Handlebars expressions used in your template (e.g., {{expressionToReplace}}).');
};
