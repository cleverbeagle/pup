import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import Loading from '../Loading';
import { users as usersQuery } from '../../queries/Users.gql';

import { StyledListGroup, StyledListGroupItem } from './styles';

const UserPagination = ({ data, perPage, currentPage, onChangePage }) => {
  const pages = [];
  const pagesToGenerate = Math.ceil(data.users.total / perPage);

  for (let pageNumber = 1; pageNumber <= pagesToGenerate; pageNumber += 1) {
    pages.push(
      <Pagination.Item
        role="presentation"
        key={`pagination_${pageNumber}`}
        active={pageNumber === currentPage}
        onClick={() => onChangePage(pageNumber)}
        onKeyDown={() => onChangePage(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>,
    );
  }
  return <Pagination className="mt-3">{pages}</Pagination>;
};

UserPagination.propTypes = {
  data: PropTypes.object.isRequired,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

const AdminUsersList = ({ data, search, perPage, currentPage, onChangePage }) => {
  if (data.loading) return <Loading />;
  return (
    <>
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
      {data.users && data.users.total && search.trim() === '' && data.users.total > perPage && (
        <UserPagination
          data={data}
          perPage={perPage}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      )}
    </>
  );
};

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
