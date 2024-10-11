import React from 'react';

const renderChildren = (props) => {
  const { children, minimized } = props;

  return React.Children.map(children, (child) => {
    const newProps = {
      minimized,
    };

    return React.cloneElement(child, newProps);
  });
};

export default renderChildren;
