import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import autoBind from 'react-autobind';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import BlankState from '../BlankState/BlankState';

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
    this.state = { loading: true, settings: [] };
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
        this.fetchSettings();
      }
    });
  }

  fetchSettings() {
    Meteor.call('users.fetchSettings', this.props, (error, settings) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({ settings, loading: false });
      }
    });
  }

  renderSettingValue(key, value, onChange) {
    return {
      // TODO: Support numbers and strings.
      boolean: valueToRender => (<ToggleSwitch id={key} toggled={value} onToggle={(id, toggled) => onChange({ key, value: toggled })} />),
    }[typeof value](value);
  }

  render() {
    const { loading, settings } = this.state;
    return (
      <div className="UserSettings">
        {!loading ? (
          <ListGroup>
            {settings.length > 0 ? settings.map(({ _id, key, label, value }) => (
              <Setting key={key} className="clearfix">
                <p>{label}</p>
                <div>
                  {this.renderSettingValue(key, value, update => this.handleUpdateSetting({ ...update, _id }))}
                </div>
              </Setting>
            )) : (
              <BlankState
                icon={{ style: 'solid', symbol: 'cogs' }}
                title={`No settings to manage ${this.props.isAdmin ? 'for this user' : 'yet'}.`}
                subtitle={`${this.props.isAdmin ? 'GDPR-specific settings intentionally excluded. ' : ''} When there are settings to manage, they'll appear here.`}
              />
            )}
          </ListGroup>
        ) : ''}
      </div>
    );
  }
}

UserSettings.defaultProps = {
  userId: null,
  isAdmin: false,
};

UserSettings.propTypes = {
  userId: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default UserSettings;
