import React from 'react';
import PropTypes from 'prop-types';
import { Input, Sidebar } from '@puppet/react-components';
import './TableOfContentsRenderer.scss';

const propTypes = {
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};
const defaultProps = {
  children: null,
};

export function TableOfContentsRenderer({
  children,
  searchTerm,
  onSearchTermChange,
}) {
  return (
    <Sidebar.Navigation>
      <Input
        name="filter"
        className="pds-filter"
        icon="search"
        placeholder="Search"
        value={searchTerm}
        onChange={value => onSearchTermChange(value)}
      />
      {children}
    </Sidebar.Navigation>
  );
}

TableOfContentsRenderer.propTypes = propTypes;
TableOfContentsRenderer.defaultProps = defaultProps;

export default TableOfContentsRenderer;
