import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminUserSettingsModal from '../../components/AdminUserSettingsModal';

class AdminUserSettings extends React.Component {
  state = { userSettings: [], showSettingsModal: false, currentSetting: null };

  componentWillMount() {
    this.fetchSettings();
  }

  fetchSettings = () => {
    Meteor.call('admin.fetchUserSettings', (error, userSettings) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({ userSettings });
      }
    });
  }

  handleDeleteSetting = (settingId) => {
    if (confirm('Are you sure? Before deleting this setting make sure that it\'s no longer in use in your application!')) {
      Meteor.call('admin.deleteUserSetting', settingId, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Setting deleted!', 'success');
          this.fetchSettings();
        }
      });
    }
  }

  render() {
    return (
      <div className="AdminUserSettings">
        <div className="page-header clearfix">
          <h4 className="pull-left">User Settings</h4>
          <Button bsStyle="success" className="pull-right" onClick={() => this.setState({ showSettingsModal: true })}>Add Setting</Button>
        </div>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Key</th>
              <th width="15%" />
              <th width="15%" />
            </tr>
          </thead>
          <tbody>
            {this.state.userSettings.map(setting => (
              <tr key={setting._id}>
                <td>{setting.key}</td>
                <td>
                  <Button bsStyle="default" onClick={() => this.setState({ showSettingsModal: true, currentSetting: setting })} block>Edit</Button>
                </td>
                <td>
                  <Button bsStyle="danger" onClick={() => this.handleDeleteSetting(setting._id)} block>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AdminUserSettingsModal
          show={this.state.showSettingsModal}
          onHide={() => this.setState({ showSettingsModal: false }, () => this.fetchSettings())}
          setting={this.state.currentSetting}
        />
      </div>
    );
  }
}

AdminUserSettings.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default AdminUserSettings;
