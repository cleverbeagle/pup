import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <Jumbotron>
      <img
        src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
        alt="Clever Beagle"
      />
      <p>Need help building your app? Check out our mentorship service.</p>
    </Jumbotron>
  </div>
);

export default Index;
