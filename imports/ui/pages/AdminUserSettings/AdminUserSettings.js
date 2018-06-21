import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';

class AdminUserSettings extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // this.thing = this.thing.bind(this);
  }

  render() {
    return (
      <div className="AdminUserSettings">
        <div className="page-header clearfix">
          <h4 className="pull-left">User Settings</h4>
          <Button bsStyle="success" className="pull-right">Add Setting</Button>
        </div>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Key</th>
              <th>Label</th>
              <th className="text-center">Type</th>
              <th className="text-center">Default</th>
              <th className="text-center">GDPR</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>canSendMarketingEmails</td>
              <td>Can we send you marketing emails?</td>
              <td className="text-center">Boolean (true/false)</td>
              <td className="text-center">true</td>
              <td className="text-center">Yes</td>
              <td>
                <Button bsStyle="default" block>Edit</Button>
              </td>
              <td>
                <Button bsStyle="danger" block>Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

AdminUserSettings.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default AdminUserSettings;
