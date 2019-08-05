import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import StyledSearchInput from './styles';

const SearchInput = ({ placeholder, value, onChange }) => (
  <StyledSearchInput className="SearchInput">
    <Icon iconStyle="solid" icon="search" />
    <input
      type="text"
      name="search"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </StyledSearchInput>
);

SearchInput.defaultProps = {
  placeholder: 'Search...',
  value: '',
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
