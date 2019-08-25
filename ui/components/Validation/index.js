import React from 'react';
import { Meteor } from 'meteor/meteor';
import { isNil } from 'lodash';
import PropTypes from 'prop-types';

let validate;

class Validation extends React.Component {
  form = React.createRef();

  validateInstance = null;

  state = {
    clientModulesReady: false,
  };

  componentDidMount() {
    const { clientModulesReady } = this.state;
    if (!clientModulesReady) {
      this.loadClientModules();
    }
  }

  componentDidUpdate() {
    const { clientModulesReady } = this.state;
    if (clientModulesReady) {
      this.loadValidation();
    }
  }

  loadValidation = () => {
    const { children, ...rest } = this.props;
    if (!isNil(this.validateInstance)) {
      this.validateInstance.destroy();
    }
    this.validateInstance = validate(this.form.current, { ...rest });
  };

  async loadClientModules() {
    if (Meteor.isClient) {
      const validateModule = await import('../../../modules/client/validate');
      validate = validateModule.default;

      this.setState({ clientModulesReady: true });
    }
  }

  render() {
    const { clientModulesReady } = this.state;
    const { children } = this.props;
    const isChildAllowed =
      React.Children.only(children) &&
      (children.type === 'form' || children.type.displayName === 'Form');
    if (!clientModulesReady) {
      console.warn('[Pup] The client modules are not ready.');
      return null;
    }
    if (!isChildAllowed) {
      console.warn(
        '[Pup] A single <form></form> element is the only allowed child of the Validation component.',
      );
      return null;
    }

    return (
      <>
        {React.cloneElement(children, {
          ref: this.form,
        })}
      </>
    );
  }
}

Validation.propTypes = {
  children: PropTypes.node.isRequired,
  rules: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

export default Validation;
