import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon';

const StyledToggleSwitch = styled.div`
  display: inline-block;
  min-width: 58px;
  background: ${props => (props.toggled ? 'var(--success)' : '#ccc')};
  border-radius: 100px;
  transition: background 200ms ease, padding 200ms ease;
  text-align: left;
  padding: ${props => (props.toggled ? '4px 10px 4px 4px' : '4px 4px 4px 10px')};

  &:hover {
    cursor: pointer;
  }

  .handle {
    display: inline-block;
    min-width: 45px;
    height: 26px;
    background: #fff;
    border-radius: 100px;
    font-size: 12px;
    text-transform: uppercase;
    color: var(--success);
    text-align: center;
    padding: 0 10px;

    .handle-label {
      display: inline-block;
      margin-top: 3px;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: ${props => (props.toggled ? 'var(--success)' : '#ccc')};
    }
  }
`;

class ToggleSwitch extends React.Component {
  state = { toggled: props.toggled };

  componentWillReceiveProps(nextProps) {
    this.setState({ toggled: nextProps.toggled });
  }

  toggleSwitch = (event) => {
    event.stopPropagation();
    const toggled = !this.state.toggled;
    this.setState({ toggled }, () => {
      if (this.props.onToggle) this.props.onToggle(this.props.id, toggled);
    });
  }

  render() {
    const { onLabel, offLabel } = this.props;
    const { toggled } = this.state;
    return (
      <StyledToggleSwitch className="ToggleSwitch" toggled={toggled} onClick={this.toggleSwitch}>
        <div className="handle">
          <span className="handle-label">
            {toggled ? onLabel || <Icon iconStyle="solid" icon="check" /> : offLabel || <Icon iconStyle="solid" icon="remove" />}
          </span>
        </div>
      </StyledToggleSwitch>
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

export default ToggleSwitch;
