import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Styles from './styles';

const SearchInput = ({ placeholder, value, onChange }) => (
  <Styles.SearchInput className="SearchInput">
    <Icon iconStyle="solid" icon="search" />
    <input
      type="text"
      name="search"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Styles.SearchInput>
);

SearchInput.defaultProps = {
  placeholder: 'Search...',
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
