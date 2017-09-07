import { Email } from 'meteor/email';
import getPrivateFile from './get-private-file';
import templateToText from './handlebars-email-to-text';
import templateToHTML from './handlebars-email-to-html';

const sendEmail = (options, { resolve, reject }) => {
  try {
    Meteor.defer(() => Email.send(options));
    if (callback) resolve();
  } catch (exception) {
    reject(exception);
  }
};

export default ({ text, html, template, templateVars, ...rest }, callback) => {
  if (text || html || template) {
    return new Promise((resolve, reject) => {
      sendEmail({
        ...rest,
        text: template ? templateToText(getPrivateFile(`email-templates/${template}.txt`), (templateVars || {})) : text,
        html: template ? templateToHTML(getPrivateFile(`email-templates/${template}.html`), (templateVars || {})) : html,
      }, { resolve, reject });
    });
  }
  throw new Error('Please pass an HTML string, text, or template name to compile for your message\'s body.');
};
