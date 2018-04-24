import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export default container =>
  Component =>
    withTracker((props) => {
      if (Meteor.isClient) return container(props);
      return {};
    })(Component);
