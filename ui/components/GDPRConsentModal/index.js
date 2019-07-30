import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { compose, graphql } from 'react-apollo';
import UserSettings from '../UserSettings';
import { userSettings as userSettingsQuery } from '../../queries/Users.gql';
import { updateUser as updateUserMutation } from '../../mutations/Users.gql';
import unfreezeApolloCacheValue from '../../../modules/unfreezeApolloCacheValue';
import Styles from './styles';

class GDPRConsentModal extends React.Component {
  state = { show: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.user && nextProps.data.user.settings) {
      let gdprComplete = true;
      const gdprSettings = nextProps.data.user.settings.filter(
        (setting) => setting.isGDPR === true,
      );
      gdprSettings.forEach(({ lastUpdatedByUser }) => {
        if (!lastUpdatedByUser) gdprComplete = false;
      });
      this.setState({ show: !gdprComplete });
    }
  }

  handleSaveSettings = () => {
    const { data, updateUser } = this.props;
    if (data && data.user && data.user.settings) {
      updateUser({
        variables: {
          user: {
            settings: unfreezeApolloCacheValue(data && data.user && data.user.settings).map(
              (setting) => {
                const settingToUpdate = setting;
                settingToUpdate.lastUpdatedByUser = new Date().toISOString();
                return settingToUpdate;
              },
            ),
          },
        },
        refetchQueries: [{ query: userSettingsQuery }],
      });
    }
  };

  render() {
    const { data, updateUser } = this.props;
    const { show } = this.state;

    return (
      <div className="GDPRConsentModal">
        <Styles.GDPRConsentModal
          backdrop="static"
          show={show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header>
            <h4>GDPR Consent</h4>
          </Modal.Header>
          <Modal.Body>
            <p>
              {"In cooperation with the European Union's (EU) "}
              <a href="https://www.eugdpr.org/" target="_blank" rel="noopener noreferrer">
                {'General Data Protection Regulation'}
              </a>
              {
                ' (GDPR), we need to obtain your consent for how we make use of your data. Please review each of the settings below to customize your experience.'
              }
            </p>
            <UserSettings settings={data.user && data.user.settings} updateUser={updateUser} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="success"
              onClick={() => {
                this.handleSaveSettings();
                this.setState({ show: false });
              }}
            >
              Save Settings
            </Button>
          </Modal.Footer>
        </Styles.GDPRConsentModal>
      </div>
    );
  }
}

GDPRConsentModal.propTypes = {
  data: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default compose(
  graphql(userSettingsQuery),
  graphql(updateUserMutation, {
    name: 'updateUser',
  }),
)(GDPRConsentModal);
