import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import getPrivateFile from './getPrivateFile';
import templateToText from './handlebarsEmailToText';
import templateToHtml from './handlebarsEmailToHtml';

const sendEmail = (options, { resolve, reject }) => {
  try {
    Meteor.defer(() => {
      Email.send(options);
      resolve();
    });
  } catch (exception) {
    reject(exception);
  }
};

export default ({
  text, html, template, templateVars, ...rest
}) => {
  if (text || html || template) {
    return new Promise((resolve, reject) => {
      sendEmail({
        ...rest,
        text: template ? templateToText(getPrivateFile(`email-templates/${template}.txt`), (templateVars || {})) : text,
        html: template ? templateToHtml(getPrivateFile(`email-templates/${template}.html`), (templateVars || {})) : html,
      }, { resolve, reject });
    });
  }
  throw new Error('Please pass an HTML string, text, or template name to compile for your message\'s body.');
};
