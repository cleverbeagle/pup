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
    margin: 0 5px 0 0;
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

  renderSettingValue(type, key, value, onChange) {
    return {
      boolean: () => (<ToggleSwitch id={key} toggled={value} onToggle={(id, toggled) => onChange({ key, value: toggled })} />),
      number: () => (<input type="number" className="form-control" value={value} onChange={event => onChange({ key, value: parseInt(event.target.value, 10) })} />),
      string: () => (<input type="text" className="form-control" value={value} onChange={event => onChange({ key, value: event.target.value })} />),
    }[type]();
  }

  render() {
    const { loading, settings } = this.state;
    return (
      <div className="UserSettings">
        {!loading ? (
          <ListGroup>
            {settings.length > 0 ? settings.map(({ _id, key, label, type, value }) => (
              <Setting key={key} className="clearfix">
                <p>{label}</p>
                <div>
                  {this.renderSettingValue(type, key, value, update => this.handleUpdateSetting({ ...update, _id }))}
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
