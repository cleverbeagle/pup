import $ from 'jquery';
import 'jquery-validation';

$.validator.addMethod('minStrict', (value, el, param) => value > param);
$.validator.addMethod('maxStrict', (value, el, param) => value < param);

export default (form, options) => {
  return $(form).validate(options);
};
