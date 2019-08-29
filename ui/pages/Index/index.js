import React from 'react';
import { Button } from 'react-bootstrap';
import Icon from '../../components/Icon';
import Styles from './styles';

const Index = () => (
  <Styles.Index>
    <img
      src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
      alt="Clever Beagle"
    />
    <h1>Pup</h1>
    <p>The Ultimate Boilerplate for Products.</p>
    <div>
      <Button variant="light" href="http://cleverbeagle.com/pup">
        Read the Docs
      </Button>
      <Button variant="light" href="https://github.com/cleverbeagle/pup">
        <Icon iconStyle="solid" icon="star" />
        {' Star on GitHub'}
      </Button>
    </div>
    <footer>
      <p>
        {'Want to learn how to build a really solid MVP with Pup? '}
        <a href="https://cleverbeagle.com/together?utm_source=pup&utm_medium=app&utm_campaign=oss">
          Check out Together by Clever Beagle
        </a>
        .
      </p>
    </footer>
  </Styles.Index>
);

export default Index;
