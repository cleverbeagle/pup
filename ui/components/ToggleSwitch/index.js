import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Styles from './styles';

class ToggleSwitch extends React.Component {
  state = { toggled: this.props.toggled };

  componentWillReceiveProps(nextProps) {
    this.setState({ toggled: nextProps.toggled });
  }

  toggleSwitch = (event) => {
    event.stopPropagation();
    const toggled = !this.state.toggled;
    this.setState({ toggled }, () => {
      if (this.props.onToggle) this.props.onToggle(this.props.id, toggled);
    });
  };

  render() {
    const { onLabel, offLabel } = this.props;
    const { toggled } = this.state;
    return (
      <Styles.ToggleSwitch className="ToggleSwitch" toggled={toggled} onClick={this.toggleSwitch}>
        <div className="handle">
          <span className="handle-label">
            {toggled
              ? onLabel || <Icon iconStyle="solid" icon="check" />
              : offLabel || <Icon iconStyle="solid" icon="remove" />}
          </span>
        </div>
      </Styles.ToggleSwitch>
    );
  }
}

ToggleSwitch.propTypes = {
  id: PropTypes.string,
  toggled: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  onToggle: PropTypes.func,
};

ToggleSwitch.defaultProps = {
  id: '',
  toggled: false,
  onLabel: '',
  offLabel: '',
  onToggle: () => {},
};

export default ToggleSwitch;
