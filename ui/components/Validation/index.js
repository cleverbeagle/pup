import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import validate from '../../../modules/validate';

class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  componentDidMount() {
    const { children, ...rest } = this.props;
    validate(this.form, { ...rest });
  }

  render() {
    if (!React.Children.only(this.props.children) || this.props.children.type !== 'form') {
      console.warn(
        '[Pup] A single <form></form> element is the only allowed child of the Validation component.',
      );
      return null;
    }

    return (
      <React.Fragment>{React.cloneElement(this.props.children, { ref: (form) => (this.form = form) })}</React.Fragment>
    );
  }
}

Validation.propTypes = {
  children: PropTypes.node.isRequired,
  rules: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

export default Validation;
