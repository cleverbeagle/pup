import handlebars from 'handlebars';

export default (handlebarsMarkup, context) => {
  if (handlebarsMarkup && context) {
    const template = handlebars.compile(handlebarsMarkup);
    return template(context);
  }

  throw new Error('Please pass Handlebars markup to compile and a context object with data mapping to the Handlebars expressions used in your template.');
};
