import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { Button } from '@puppet/react-components';

export function TabButtonRenderer({
  name,
  className,
  onClick,
  active,
  children,
}) {
  return (
    <Button
      name={name}
      className={className}
      type="transparent"
      icon={active ? 'chevron-down' : 'chevron-right'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

TabButtonRenderer.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default TabButtonRenderer;
