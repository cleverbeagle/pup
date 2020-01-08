import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Icon from '../Icon';
import Styles from './styles';

const SearchInput = ({ placeholder, value, onChange }) => (
  <Styles.SearchInput className="SearchInput">
    <Icon iconStyle="solid" icon="search" />
    <Form.Control
      type="text"
      name="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </Styles.SearchInput>
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
