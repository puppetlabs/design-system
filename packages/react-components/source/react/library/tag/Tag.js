import React from 'react';
import { func, string } from 'prop-types';
import Button from '../button';
import Text from '../text';

const propTypes = {
  /** Tag text or other content */
  label: string.isRequired,
  /** Callback function called when clode icon is clicked */
  onClick: func,
};

const defaultProps = {
  onClick: () => {},
};

const Tag = ({ label, onClick }) => {
  return (
    <div className="rc-tag">
      <div className="rc-tag-label-background">
        <Text className="rc-tag-text">{label}</Text>
      </div>
      <Button
        className="rc-tag-remove-button"
        onClick={() => onClick()}
        icon="close"
        aria-label={`${label} Remove tag`}
      />
    </div>
  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
