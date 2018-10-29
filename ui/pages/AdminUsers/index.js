/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/anchor-is-valid */

import React from 'react';
import SearchInput from '../../components/SearchInput';
import AdminUsersList from '../../components/AdminUsersList';

import { AdminUsersHeader } from './styles';

class AdminUsers extends React.Component {
  state = {
    currentPage: 1,
  };

  render() {
    return (
      <div className="AdminUsers">
        <AdminUsersHeader className="page-header clearfix">
          <h4 className="pull-left">Users</h4>
          <SearchInput
            placeholder="Search users..."
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}
          />
        </AdminUsersHeader>
        <AdminUsersList
          search={this.state.search}
          currentPage={this.state.currentPage}
          usersPerPage={10}
          onChangePage={(currentPage) => this.setState({ currentPage })}
        />
      </div>
    );
  }
}

AdminUsers.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default AdminUsers;
