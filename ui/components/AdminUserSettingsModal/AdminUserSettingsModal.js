import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import { camelCase } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import InputHint from '../InputHint';
import ToggleSwitch from '../ToggleSwitch';
import delay from '../../../modules/delay';
import validate from '../../../modules/validate';

class AdminUserSettingsModal extends React.Component {
  state = {
    keyName: '',
    isGDPR: false,
    settingType: 'boolean',
    value: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.setting) {
      this.setState({
        keyName: nextProps.setting.key,
        isGDPR: nextProps.setting.isGDPR,
        settingType: nextProps.setting.type,
        value: nextProps.setting.value,
        label: nextProps.setting.label,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.show) setTimeout(() => this.attachValidation(), 0);
  }

  attachValidation = () => {
    const component = this;
    validate(component.form, {
      rules: {
        keyName: {
          required: true,
        },
        label: {
          required: true,
        },
      },
      messages: {
        keyName: {
          required: 'What\'s a good keyName for this?',
        },
        label: {
          required: 'What\'s a good label for this?',
        },
      },
      submitHandler: () => { component.handleSubmit(component.form); },
    });
  }

  handleSubmit = (form) => {
    const method = this.props.setting ? 'admin.updateUserSetting' : 'admin.addUserSetting';
    const setting = {
      isGDPR: this.isGDPR.state.toggled,
      key: form.keyName.value,
      label: form.label.value.trim(),
      type: form.type.value,
      value: form.defaultValue.value,
    };

    if (this.props.setting) {
      setting._id = this.props.setting._id;
      const confirmUpdate = confirm('Are you sure? This will overwrite this setting for all users immediately. If you\'re changing the Key Name or Type, double-check that your UI can support this to avoid rendering errors.');
      if (!confirmUpdate) return;
    }

    Meteor.call(method, setting, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(this.props.setting ? 'Setting updated!' : 'Setting added!', 'success');
        this.props.onHide();
      }
    });
  }

  handleSetKeyName = (event) => {
    event.persist();
    this.setState({ keyName: event.target.value }, () => {
      delay(() => {
        this.setState({ keyName: camelCase(event.target.value.trim()) });
      }, 300);
    });
  }

  render() {
    const { show, onHide, setting } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>{setting ? 'Edit' : 'Add a'} User Setting</Modal.Title>
        </Modal.Header>
        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <Modal.Body>
            <Row>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <ControlLabel>Key Name</ControlLabel>
                  <input
                    type="text"
                    name="keyName"
                    className="form-control"
                    value={this.state.keyName}
                    onChange={this.handleSetKeyName}
                    placeholder="canWeSendYouMarketingEmails"
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <ControlLabel>Is this a GDPR setting?</ControlLabel>
                  <ToggleSwitch
                    ref={isGDPR => (this.isGDPR = isGDPR)}
                    toggled={this.state.isGDPR}
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
                value={this.state.label}
                onChange={event => this.setState({ label: event.target.value })}
                placeholder="Can we send you marketing emails?"
              />
              <InputHint>This is what users will see in their settings panel.</InputHint>
            </FormGroup>
            <Row>
              <Col xs={12} sm={6}>
                <ControlLabel>Type</ControlLabel>
                <select name="type" value={this.state.settingType} onChange={event => this.setState({ settingType: event.target.value })} className="form-control">
                  <option value="boolean">Boolean (true/false)</option>
                  <option value="number">Number</option>
                  <option value="string">String</option>
                </select>
              </Col>
              <Col xs={12} sm={6}>
                <ControlLabel>Default Value</ControlLabel>
                {this.state.settingType === 'boolean' ? (
                  <select name="defaultValue" value={this.state.value} onChange={event => this.setState({ value: event.target.value })} className="form-control">
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                ) : ''}
                {this.state.settingType === 'number' ? (
                  <input
                    type="number"
                    name="defaultValue"
                    className="form-control"
                    value={this.state.value}
                    onChange={event => this.setState({ value: parseInt(event.target.value, 10) })}
                    placeholder={5}
                  />
                ) : ''}
                {this.state.settingType === 'string' ? (
                  <input
                    type="text"
                    name="defaultValue"
                    className="form-control"
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                    placeholder="Squirrel?!"
                  />
                ) : ''}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" bsStyle="success">{setting ? 'Save' : 'Add'} Setting</Button>
          </Modal.Footer>
        </form>
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
};

export default AdminUserSettingsModal;
