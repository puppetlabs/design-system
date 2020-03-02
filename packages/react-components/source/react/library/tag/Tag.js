import React from 'react';
import { node, func } from 'prop-types';
import Button from '../button';
import Text from '../text';

const propTypes = {
  /** Tag text or other content */
  children: node.isRequired,
  /** Callback function called when clode icon is clicked */
  onClick: func,
};

const defaultProps = {
  onClick: () => {},
};

const Tag = ({ children, onClick }) => {
  return (
    <div className="rc-tag">
      <div className="rc-tag-label-background">
        <Text className="rc-tag-text">{children}</Text>
      </div>
      <Button
        className="rc-tag-remove-button"
        onClick={() => onClick()}
        icon="close"
      />
    </div>
  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
