import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import UserSettings from '../UserSettings';

const StyledGDPRConsentModal = styled(Modal)`
  .modal-body > p {
    margin-bottom: 15px;
  }

  .list-group {
    margin-bottom: 0;
  }
`;

class GDPRConsentModal extends React.Component {
  state = { show: false };

  componentWillMount() {
    Meteor.call('users.checkIfGDPRComplete', (error, complete) => {
      if (error) {
        console.warn(error);
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({ show: !complete });
      }
    });
  }

  handleSaveSettings = () => {
    Meteor.call('users.saveGDPRSettings', (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Settings saved!', 'success');
      }
    });
  }

  render() {
    return (
      <div className="GDPRConsentModal">
        <StyledGDPRConsentModal backdrop="static" show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header>
            <h4>GDPR Consent</h4>
          </Modal.Header>
          <Modal.Body>
            <p>
              In cooperation with the European Union&apos;s (EU) <a href="https://www.eugdpr.org/" target="_blank" rel="noopener noreferrer">General Data Protection Regulation</a> (GDPR), we need to obtain your consent for how we make use of your data. Please review each of the settings below to customize your experience.
            </p>
            <UserSettings gdpr />
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
        </StyledGDPRConsentModal>
      </div>
    );
  }
}

export default GDPRConsentModal;
