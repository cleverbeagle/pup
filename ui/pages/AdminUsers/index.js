import React from 'react';
import SearchInput from '../../components/SearchInput';
import PageHeader from '../../components/PageHeader';
import AdminUsersList from '../../components/AdminUsersList';

class AdminUsers extends React.Component {
  state = {
    currentPage: 1,
  };

  render() {
    const { search, currentPage } = this.state;

    return (
      <>
        <PageHeader>
          <h4>Users</h4>
          <div className="ml-auto">
            <SearchInput
              placeholder="Search users..."
              value={search}
              onChange={(event) => this.setState({ search: event.target.value })}
            />
          </div>
        </PageHeader>
        <AdminUsersList
          search={search}
          currentPage={currentPage}
          perPage={10}
          onChangePage={(newPage) => this.setState({ currentPage: newPage })}
        />
      </>
    );
  }
}

AdminUsers.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default AdminUsers;
