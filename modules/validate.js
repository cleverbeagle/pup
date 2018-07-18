import $ from 'jquery';

export default (form, options) => {
  import('jquery-validation').then(() => {
    $(form).validate(options);
  }).catch(() => {});
};
