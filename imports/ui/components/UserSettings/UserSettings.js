import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import autoBind from 'react-autobind';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

const Setting = styled(ListGroupItem)`
  display: flexbox;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  p {
    flex-grow: 1;
    margin: 0;
  }

  > div {
    flex-grow: 0;
  }
`;

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { settings: [] };
    autoBind(this);
  }

  componentWillMount() {
    this.fetchSettings();
  }

  handleUpdateSetting(setting) {
    Meteor.call('users.updateSetting', {
      userId: this.props.userId,
      ...setting,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        // this.fetchSettings();
      }
    });
  }

  fetchSettings() {
    Meteor.call('users.fetchSettings', this.props.userId, (error, settings) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({ settings });
      }
    });
  }

  renderSettingValue(key, value, onChange) {
    return {
      boolean: valueToRender => (<ToggleSwitch id={key} toggled={valueToRender} onToggle={(id, toggled) => onChange({ key, value: toggled })} />),
    }[typeof value](value);
  }

  render() {
    const { settings } = this.state;
    return (
      <div className="UserSettings">
        <ListGroup>
          {settings.map(({ key, label, value }) => (
            <Setting key={key} className="clearfix">
              <p>{label}</p>
              <div>
                {this.renderSettingValue(key, value, this.handleUpdateSetting)}
              </div>
            </Setting>
          ))}
        </ListGroup>
      </div>
    );
  }
}

UserSettings.defaultProps = {
  userId: null,
};

UserSettings.propTypes = {
  userId: PropTypes.string,
};

export default UserSettings;
