import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Styles from './styles';

const SearchInput = ({ placeholder, onKeyUp }) => (
  <Styles.SearchInput className="SearchInput">
    <Icon iconStyle="solid" icon="search" />
    <input
      type="text"
      name="search"
      className="form-control"
      placeholder={placeholder}
      onKeyUp={onKeyUp}
    />
  </Styles.SearchInput>
);

SearchInput.defaultProps = {
  placeholder: 'Search...',
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func.isRequired,
};

export default SearchInput;
