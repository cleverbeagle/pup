import React from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <img
      src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
      alt="Clever Beagle"
    />
    <h1>Pup</h1>
    <p>A boilerplate for products.</p>
    <div>
      <Button href="https://pup.cleverbeagle.com">Read the Docs</Button>
      <Button href="https://github.com/cleverbeagle/pup"><i className="fa fa-star" /> Star on GitHub</Button>
    </div>
  </div>
);

export default Index;
