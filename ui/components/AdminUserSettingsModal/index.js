import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { camelCase } from 'lodash';
import Validation from '../Validation';
import InputHint from '../InputHint';
import ToggleSwitch from '../ToggleSwitch';
import delay from '../../../modules/delay';

const defaultState = {
  keyName: '',
  isGDPR: false,
  settingType: 'boolean',
  value: '',
  label: '',
};

class AdminUserSettingsModal extends React.Component {
  state = defaultState;

  componentWillReceiveProps(nextProps) {
    if (nextProps.setting) {
      this.setState({
        keyName: nextProps.setting.key,
        isGDPR: nextProps.setting.isGDPR,
        settingType: nextProps.setting.type,
        value: nextProps.setting.value,
        label: nextProps.setting.label,
      });
    } else {
      this.setState(defaultState);
    }
  }

  handleSubmit = (form) => {
    const mutation = this.props.setting ? this.props.updateUserSetting : this.props.addUserSetting;
    const setting = {
      isGDPR: this.isGDPR.state.toggled,
      key: form.keyName.value,
      label: form.label.value.trim(),
      type: form.type.value,
      value: form.defaultValue.value,
    };

    if (this.props.setting) {
      setting._id = this.props.setting._id;
      const confirmUpdate = confirm(
        "Are you sure? This will overwrite this setting for all users immediately. If you're changing the Key Name or Type, double-check that your UI can support this to avoid rendering errors.",
      );
      if (!confirmUpdate) return;
    }

    mutation({
      variables: {
        setting,
      },
    });

    this.props.onHide();
  };

  handleSetKeyName = (event) => {
    event.persist();
    this.setState({ keyName: event.target.value }, () => {
      delay(() => {
        this.setState({ keyName: camelCase(event.target.value.trim()) });
      }, 300);
    });
  };

  render() {
    const { show, onHide, setting } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>{setting ? 'Edit' : 'Add a'} User Setting</Modal.Title>
        </Modal.Header>
        <Validation
          rules={{
            keyName: {
              required: true,
            },
            label: {
              required: true,
            },
          }}
          messages={{
            keyName: {
              required: "What's a good keyName for this?",
            },
            label: {
              required: "What's a good label for this?",
            },
          }}
          submitHandler={(form) => {
            this.handleSubmit(form);
          }}
        >
          <form ref={(form) => (this.form = form)} onSubmit={(event) => event.preventDefault()}>
            <Modal.Body>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label>Key Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="keyName"
                      value={this.state.keyName}
                      onChange={this.handleSetKeyName}
                      placeholder="canWeSendYouMarketingEmails"
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label>Is this a GDPR setting?</Form.Label>
                    <ToggleSwitch
                      ref={(isGDPR) => (this.isGDPR = isGDPR)}
                      toggled={this.state.isGDPR}
                      onToggle={(id, toggled) => this.setState({ isGDPR: toggled })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  name="label"
                  value={this.state.label}
                  onChange={(event) => this.setState({ label: event.target.value })}
                  placeholder="Can we send you marketing emails?"
                />
                <InputHint>This is what users will see in their settings panel.</InputHint>
              </Form.Group>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Label>Type</Form.Label>
                  <select
                    name="type"
                    value={this.state.settingType}
                    onChange={(event) => this.setState({ settingType: event.target.value })}
                  >
                    <option value="boolean">Boolean (true/false)</option>
                    <option value="number">Number</option>
                    <option value="string">String</option>
                  </select>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Label>Default Value</Form.Label>
                  {this.state.settingType === 'boolean' && (
                    <select
                      name="defaultValue"
                      value={this.state.value}
                      onChange={(event) => this.setState({ value: event.target.value })}
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  )}
                  {this.state.settingType === 'number' && (
                    <Form.Control
                      type="number"
                      name="defaultValue"
                      value={this.state.value}
                      onChange={(event) => {
                        this.setState({ value: parseInt(event.target.value, 10) });
                      }}
                      placeholder={5}
                    />
                  )}
                  {this.state.settingType === 'string' && (
                    <Form.Control
                      type="text"
                      name="defaultValue"
                      value={this.state.value}
                      onChange={(event) => this.setState({ value: event.target.value })}
                      placeholder="Squirrel?!"
                    />
                  )}
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="success">
                {setting ? 'Save' : 'Add'} Setting
              </Button>
            </Modal.Footer>
          </form>
        </Validation>
      </Modal>
    );
  }
}

AdminUserSettingsModal.defaultProps = {
  setting: null,
};

AdminUserSettingsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  setting: PropTypes.object,
  addUserSetting: PropTypes.func.isRequired,
  updateUserSetting: PropTypes.func.isRequired,
};

export default AdminUserSettingsModal;
