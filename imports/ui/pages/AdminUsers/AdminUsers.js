import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';

const AdminUsersHeader = styled.div`
  
`;

const StyledListGroupItem = styled(ListGroupItem)`
  padding: 15px;

  p {
    margin: 0;

    span {
      color: var(--gray-light);
    }
  }
`;

class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'users' };
    // this.thing = this.thing.bind(this);
  }

  render() {
    return (
      <div className="AdminUsers">
        <AdminUsersHeader className="page-header clearfix">
          <h4 className="pull-left">Users</h4>
        </AdminUsersHeader>
        <ListGroup>
          <StyledListGroupItem>
            <p>Jordan Peterson <span>jordan@peterson.com</span></p>
          </StyledListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

AdminUsers.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default AdminUsers;
