import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
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
    const { setting, updateUserSetting, addUserSetting, onHide } = this.props;
    const mutation = setting ? updateUserSetting : addUserSetting;
    const settingToAddOrUpdate = {
      isGDPR: this.isGDPR.state.toggled,
      key: form.keyName.value,
      label: form.label.value.trim(),
      type: form.type.value,
      value: form.defaultValue.value,
    };

    if (setting) {
      settingToAddOrUpdate._id = setting._id;
      const confirmUpdate = confirm(
        "Are you sure? This will overwrite this setting for all users immediately. If you're changing the Key Name or Type, double-check that your UI can support this to avoid rendering errors.",
      );
      if (!confirmUpdate) return;
    }

    mutation({
      variables: {
        setting: settingToAddOrUpdate,
      },
    });

    onHide();
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
    const { keyName, isGDPR, label, settingType, value } = this.state;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>
            {setting ? 'Edit' : 'Add a'}
            User Setting
          </Modal.Title>
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
                  <FormGroup>
                    <ControlLabel>Key Name</ControlLabel>
                    <input
                      type="text"
                      name="keyName"
                      className="form-control"
                      value={keyName}
                      onChange={this.handleSetKeyName}
                      placeholder="canWeSendYouMarketingEmails"
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={6}>
                  <FormGroup>
                    <ControlLabel>Is this a GDPR setting?</ControlLabel>
                    <ToggleSwitch
                      ref={(isGDPRToggle) => (this.isGDPR = isGDPRToggle)}
                      toggled={isGDPR}
                      onToggle={(id, toggled) => this.setState({ isGDPR: toggled })}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <ControlLabel>Label</ControlLabel>
                <input
                  type="text"
                  name="label"
                  className="form-control"
                  value={label}
                  onChange={(event) => this.setState({ label: event.target.value })}
                  placeholder="Can we send you marketing emails?"
                />
                <InputHint>This is what users will see in their settings panel.</InputHint>
              </FormGroup>
              <Row>
                <Col xs={12} sm={6}>
                  <ControlLabel>Type</ControlLabel>
                  <select
                    name="type"
                    value={settingType}
                    onChange={(event) => this.setState({ settingType: event.target.value })}
                    className="form-control"
                  >
                    <option value="boolean">Boolean (true/false)</option>
                    <option value="number">Number</option>
                    <option value="string">String</option>
                  </select>
                </Col>
                <Col xs={12} sm={6}>
                  <ControlLabel>Default Value</ControlLabel>
                  {settingType === 'boolean' && (
                    <select
                      name="defaultValue"
                      value={value}
                      onChange={(event) => this.setState({ value: event.target.value })}
                      className="form-control"
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  )}
                  {settingType === 'number' && (
                    <input
                      type="number"
                      name="defaultValue"
                      className="form-control"
                      value={value}
                      onChange={(event) => {
                        this.setState({ value: parseInt(event.target.value, 10) });
                      }}
                      placeholder={5}
                    />
                  )}
                  {settingType === 'string' && (
                    <input
                      type="text"
                      name="defaultValue"
                      className="form-control"
                      value={value}
                      onChange={(event) => this.setState({ value: event.target.value })}
                      placeholder="Squirrel?!"
                    />
                  )}
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" bsStyle="success">
                {setting ? 'Save' : 'Add'}
                {' Setting'}
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
