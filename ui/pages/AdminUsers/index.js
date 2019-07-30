/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/anchor-is-valid */

import React from 'react';
import SearchInput from '../../components/SearchInput';
import AdminUsersList from '../../components/AdminUsersList';

import AdminUsersHeader from './styles';

class AdminUsers extends React.Component {
  state = {
    currentPage: 1,
  };

  render() {
    const { search, currentPage } = this.state;

    return (
      <div className="AdminUsers">
        <AdminUsersHeader className="page-header clearfix">
          <h4 className="pull-left">Users</h4>
          <SearchInput
            placeholder="Search users..."
            value={search}
            onChange={(event) => this.setState({ search: event.target.value })}
          />
        </AdminUsersHeader>
        <AdminUsersList
          search={search}
          currentPage={currentPage}
          perPage={10}
          onChangePage={(newPage) => this.setState({ currentPage: newPage })}
        />
      </div>
    );
  }
}

AdminUsers.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default AdminUsers;
