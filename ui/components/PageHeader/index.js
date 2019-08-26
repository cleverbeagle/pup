import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ children }) => {
  return (
    <div className="mt-0 mt-sm-3 mb-3 px-0 pb-2 border-bottom d-flex flex-row justify-content-start">
      {children}
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageHeader;
