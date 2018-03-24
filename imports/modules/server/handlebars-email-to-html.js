import handlebars from 'handlebars';
import juice from 'juice';
import { Meteor } from 'meteor/meteor';
import getPrivateFile from './get-private-file';

export default (handlebarsMarkup, context, options) => {
  if (handlebarsMarkup && context) {
    const template = handlebars.compile(handlebarsMarkup);
    const content = template(context);

    if (options && options.noBaseTemplate) {
      // Use juice to inline CSS <style></style> styles from <head> unless disabled.
      return options && !options.inlineCss ? content : juice(content);
    }

    // automatically wrap any email templates with the base template
    // this lets us keep our email templates simple and DRY
    const base = handlebars.compile(getPrivateFile('email-templates/email-base-template.html'));

    /* The base template expects an object with a "content" key (required), "applicationName (required)"
     * and optional "twitterHandle" and "twitterUrl" keys. These values are automatically supplied to the
     * base template so that they don't also need to be provided to the skinny template which may or may not use them
     * If the base template is modified to include additional variables then they will need to be added here */
    const baseContext = {
      content,
      applicationName: Meteor.settings.public.applicationName,
      twitterHandle: Meteor.settings.public.twitterHandle,
      twitterUrl: Meteor.settings.public.twitterUrl,
    };
    // Use juice to inline CSS <style></style> styles from <head> unless disabled.
    return options && !options.inlineCss ? base(baseContext) : juice(base(baseContext));
  }

  throw new Error('Please pass Handlebars markup to compile and a context object with data mapping to the Handlebars expressions used in your template.');
};
