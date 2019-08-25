import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ children }) => {
  return (
    <div className="mt-2 mt-sm-0 mb-1 py-1 border-bottom d-flex flex-row justify-content-start">
      {children}
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageHeader;
