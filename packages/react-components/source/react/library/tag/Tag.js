import React from 'react';
import { func, string, oneOf } from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import Text from '../text';

const propTypes = {
  /** Tag text or other content */
  label: string.isRequired,
  /** Callback function called when clode icon is clicked */
  onClick: func,
  /** Type dictates tag coloring */
  type: oneOf(['primary', 'neutral']),
  /** Currently only subtle netural supported */
  emphasis: oneOf(['bold', 'subtle']),
  /** Optional additional classnames */
  className: string,
};

const defaultProps = {
  onClick: () => {},
  type: 'primary',
  className: '',
  emphasis: 'bold',
};

const Tag = ({ label, onClick, type, emphasis, className }) => {
  return (
    <div
      className={classNames(
        'rc-tag',
        `rc-tag-${type}`,
        `rc-tag-${emphasis}`,
        className,
      )}
    >
      <div className="rc-tag-label-background">
        <Text className="rc-tag-text">{label}</Text>
      </div>
      <Button
        className="rc-tag-remove-button"
        onClick={() => onClick()}
        icon="close"
        iconSize="small"
        aria-label={`${label} Remove tag`}
      />
    </div>
  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
