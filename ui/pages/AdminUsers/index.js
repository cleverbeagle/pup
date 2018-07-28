/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/anchor-is-valid */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import SearchInput from '../../components/SearchInput';
import delay from '../../../modules/delay';
import Styles from './styles';

class AdminUsers extends React.Component {
  state = {
    total: 0,
    users: [],
    usersPerPage: 10,
    currentPage: 1,
    searching: false,
  };

  componentWillMount() {
    this.fetchUsers();
  }

  fetchUsers = (search) => {
    Meteor.call('admin.fetchUsers', {
      currentPage: this.state.currentPage,
      perPage: this.state.usersPerPage,
      search,
    }, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({ ...response });
      }
    });
  }

  handleSearch = (event) => {
    event.persist();
    if (event.target.value.trim() !== '') {
      this.setState({ searching: true });
      delay(() => this.fetchUsers(event.target.value.trim()), 500);
    } else {
      this.setState({ searching: false });
      this.fetchUsers();
    }
  }

  renderPagination = (totalUsers, perPage, currentPage) => {
    const pages = [];
    const pagesToGenerate = Math.ceil(totalUsers / perPage);

    for (let pageNumber = 1; pageNumber <= pagesToGenerate; pageNumber += 1) {
      pages.push( // eslint-disable-line
        <li
          role="button"
          key={`pagination_${pageNumber}`}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => this.setState({ currentPage: pageNumber }, () => this.fetchUsers())}
          onKeyDown={() => this.setState({ currentPage: pageNumber }, () => this.fetchUsers())}
        >
          <a href="#" role="button" onClick={event => event.preventDefault()}>{pageNumber}</a>
        </li>,
      ); // eslint-disable-line
    }

    return (
      <ul className="pagination pagination-md">
        {pages}
      </ul>
    );
  }

  render() {
    return (
      <div className="AdminUsers">
        <Styles.AdminUsersHeader className="page-header clearfix">
          <h4 className="pull-left">Users {this.state.total && <span>{this.state.total}</span>}</h4>
          <SearchInput
            placeholder="Search users..."
            onKeyUp={this.handleSearch}
          />
        </Styles.AdminUsersHeader>
        <Styles.ListGroup>
          {this.state.users.map(({
            _id, emails, username, profile, service,
          }) => (
            <Styles.ListGroupItem key={_id}>
              <Link to={`/admin/users/${_id}`} />
              <p>{profile ? `${profile.name.first} ${profile.name.last}` : username } <span>{emails[0].address}</span> {service !== 'password' && <span className={`label label-${service}`}>{service}</span>}</p>
            </Styles.ListGroupItem>
          ))}
        </Styles.ListGroup>
        {this.state.total && !this.state.searching && this.state.total > this.state.usersPerPage &&
          this.renderPagination(this.state.total, this.state.usersPerPage, this.state.currentPage)
        }
      </div>
    );
  }
}

AdminUsers.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default AdminUsers;
