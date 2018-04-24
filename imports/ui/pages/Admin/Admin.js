import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'users' };
    // this.thing = this.thing.bind(this);
  }

  render() {
    return (
      <div className="Admin">
        <Row>
          <Col xs={12} sm={4}>
            <Nav bsStyle="pills" stacked activeKey={this.state.page} onSelect={page => this.setState({ page })}>
              <NavItem eventKey="users" href="/admin/users">
                Users
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </div>
    );
  }
}

Admin.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default Admin;
