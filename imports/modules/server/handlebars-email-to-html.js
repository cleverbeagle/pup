import handlebars from 'handlebars';
import juice from 'juice';

export default (handlebarsMarkup, context, options) => {
  if (handlebarsMarkup && context) {
    const template = handlebars.compile(handlebarsMarkup);
    return options && !options.inlineCss ? template(context) : juice(template(context)); // Use juice to inline CSS <style></style> styles from <head> unless disabled.
  }

  throw new Error('Please pass Handlebars markup to compile and a context object with data mapping to the Handlebars expressions used in your template.');
};
