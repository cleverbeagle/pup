import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
  import $ from 'jquery';
  import 'jquery-validation';

  export default (form, options) => $(form).validate(options);
}
