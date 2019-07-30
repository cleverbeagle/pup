import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';
import { Bert } from 'meteor/themeteorchef:bert';
import AdminUserSettingsModal from '../../components/AdminUserSettingsModal';
import BlankState from '../../components/BlankState';
import userSettingsQuery from '../../queries/UserSettings.gql';
import {
  addUserSetting as addUserSettingMutation,
  updateUserSetting as updateUserSettingMutation,
  removeUserSetting as removeUserSettingMutation,
} from '../../mutations/UserSettings.gql';

const Setting = styled(ListGroupItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
    word-break: break-word;
  }

  .btn:last-child {
    margin-left: 10px;
    margin-right: -5px;
  }
`;

class AdminUserSettings extends React.Component {
  state = { showSettingsModal: false, currentSetting: null };

  handleDeleteSetting = (settingId) => {
    const { removeUserSetting } = this.props;
    if (
      confirm(
        "Are you sure? Before deleting this setting make sure that it's no longer in use in your application!",
      )
    ) {
      removeUserSetting({
        variables: {
          _id: settingId,
        },
      });
    }
  };

  render() {
    const { data, addUserSetting, updateUserSetting } = this.props;
    const { showSettingsModal, currentSetting } = this.state;
    return (
      <div className="AdminUserSettings">
        <div className="page-header clearfix">
          <h4 className="pull-left">User Settings</h4>
          <Button
            bsStyle="success"
            className="pull-right"
            onClick={() => this.setState({ showSettingsModal: true, currentSetting: null })}
          >
            Add Setting
          </Button>
        </div>
        {data.userSettings && data.userSettings.length > 0 ? (
          <ListGroup>
            {data.userSettings.map((setting) => (
              <Setting key={setting._id}>
                <p>{setting.key}</p>
                <div>
                  <Button
                    bsStyle="default"
                    onClick={() =>
                      this.setState({ showSettingsModal: true, currentSetting: setting })
                    }
                  >
                    Edit
                  </Button>
                  <Button bsStyle="danger" onClick={() => this.handleDeleteSetting(setting._id)}>
                    Delete
                  </Button>
                </div>
              </Setting>
            ))}
          </ListGroup>
        ) : (
          <BlankState
            icon={{ style: 'solid', symbol: 'gear' }}
            title="No user settings here, friend."
            subtitle="Add your first setting by clicking the button below."
            action={{
              style: 'success',
              onClick: () => this.setState({ showSettingsModal: true, currentSetting: null }),
              label: 'Create Your First Setting',
            }}
          />
        )}
        <AdminUserSettingsModal
          show={showSettingsModal}
          onHide={() => this.setState({ showSettingsModal: false, currentSetting: null })}
          setting={currentSetting}
          addUserSetting={addUserSetting}
          updateUserSetting={updateUserSetting}
        />
      </div>
    );
  }
}

AdminUserSettings.propTypes = {
  data: PropTypes.object.isRequired,
  addUserSetting: PropTypes.func.isRequired,
  updateUserSetting: PropTypes.func.isRequired,
  removeUserSetting: PropTypes.func.isRequired,
};

export default compose(
  graphql(userSettingsQuery),
  graphql(addUserSettingMutation, {
    name: 'addUserSetting',
    options: () => ({
      refetchQueries: [{ query: userSettingsQuery }],
      onCompleted: () => {
        Bert.alert('Setting added!', 'success');
      },
    }),
  }),
  graphql(updateUserSettingMutation, {
    name: 'updateUserSetting',
    options: () => ({
      refetchQueries: [{ query: userSettingsQuery }],
      onCompleted: () => {
        Bert.alert('Setting updated!', 'success');
      },
    }),
  }),
  graphql(removeUserSettingMutation, {
    name: 'removeUserSetting',
    options: () => ({
      refetchQueries: [{ query: userSettingsQuery }],
      onCompleted: () => {
        Bert.alert('Setting removed!', 'success');
      },
    }),
  }),
)(AdminUserSettings);
