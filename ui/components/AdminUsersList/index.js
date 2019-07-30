/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Loading from '../Loading';
import { users as usersQuery } from '../../queries/Users.gql';

import { StyledListGroup, StyledListGroupItem } from './styles';

class AdminUsersList extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderPagination = () => {
    const { data, perPage, currentPage, onChangePage } = this.props;
    const pages = [];
    const pagesToGenerate = Math.ceil(data.users.total / perPage);

    for (let pageNumber = 1; pageNumber <= pagesToGenerate; pageNumber += 1) {
      pages.push(
        <li
          role="presentation"
          key={`pagination_${pageNumber}`}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => onChangePage(pageNumber)}
          onKeyDown={() => onChangePage(pageNumber)}
        >
          <a href="#" onClick={(event) => event.preventDefault()}>
            {pageNumber}
          </a>
        </li>,
      );
    }

    return <ul className="pagination pagination-md">{pages}</ul>;
  };

  render() {
    const { data, search, perPage } = this.props;

    if (data.loading) return <Loading />;
    return (
      <React.Fragment>
        <StyledListGroup>
          {data.users &&
            data.users.users &&
            data.users.users.map(({ _id, emailAddress, name, username, oAuthProvider }) => (
              <StyledListGroupItem key={_id}>
                <Link to={`/admin/users/${_id}`} />
                <p>
                  {name ? `${name.first} ${name.last}` : username}
                  <span>{emailAddress}</span>
                  {oAuthProvider && (
                    <span className={`label label-${oAuthProvider}`}>{oAuthProvider}</span>
                  )}
                </p>
              </StyledListGroupItem>
            ))}
        </StyledListGroup>
        {data.users &&
          data.users.total &&
          search.trim() === '' &&
          data.users.total > perPage &&
          this.renderPagination()}
      </React.Fragment>
    );
  }
}

AdminUsersList.defaultProps = {
  search: '',
};

AdminUsersList.propTypes = {
  data: PropTypes.object.isRequired,
  search: PropTypes.string,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default graphql(usersQuery, {
  options: ({ perPage, currentPage, search }) => ({
    variables: {
      perPage,
      currentPage,
      search,
    },
  }),
})(AdminUsersList);
