import React from 'react';
import { Button } from 'react-bootstrap';
import Styles from './styles';

const Index = () => (
  <Styles.Index>
    <img
      src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
      alt="Clever Beagle"
    />
    <h1>Pup</h1>
    <p>A boilerplate for products.</p>
    <div>
      <Button href="http://cleverbeagle.com/pup">Read the Docs</Button>
      <Button href="https://github.com/cleverbeagle/pup">
        <i className="fa fa-star" /> Star on GitHub
      </Button>
    </div>
    <footer>
      <p>
        Want to ensure that your product sees the light of day?{' '}
        <a href="https://cleverbeagle.com?utm_source=pup&utm_medium=app&utm_campaign=oss">
          Work with Clever Beagle
        </a>
        .
      </p>
    </footer>
  </Styles.Index>
);

export default Index;
