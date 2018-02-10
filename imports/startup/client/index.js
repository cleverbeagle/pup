import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';
import '../both/api';

import '../../ui/stylesheets/app.scss';

Meteor.startup(() => render(<App />, document.getElementById('react-root')));
