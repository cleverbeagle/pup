import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

const StyledSearchInput = styled.div`
  position: relative;

  i {
    position: absolute;
    left: 12px;
    top: 10px;
    color: var(--gray-light);
  }

  .form-control {
    padding-left: 30px;
  }
`;

const SearchInput = ({ placeholder, onKeyUp }) => (
  <StyledSearchInput className="SearchInput">
    <Icon iconStyle="solid" icon="search" />
    <input
      type="text"
      name="search"
      className="form-control"
      placeholder={placeholder}
      onKeyUp={onKeyUp}
    />
  </StyledSearchInput>
);

SearchInput.defaultProps = {
  placeholder: 'Search...',
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func.isRequired,
};

export default SearchInput;
