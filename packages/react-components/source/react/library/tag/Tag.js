import React from 'react';
import { func, string, oneOf, bool, node } from 'prop-types';
import classNames from 'classnames';
import Button from '../button';
import Text from '../text';

import AddTagFilter from './AddTagFilter';

const propTypes = {
  /** Tag text or other content */
  label: node.isRequired,
  /** Callback function called when clode icon is clicked */
  onClick: func,
  /** Type dictates tag coloring */
  type: oneOf(['primary', 'neutral']),
  /** Currently only subtle netural supported */
  emphasis: oneOf(['bold', 'subtle']),
  /** Optional additional classnames */
  className: string,
  /** Boolean to hide/show close button */
  hideRemoveButton: bool,
};

const defaultProps = {
  onClick: () => {},
  type: 'primary',
  className: '',
  emphasis: 'bold',
  hideRemoveButton: false,
};

const Tag = ({
  label,
  onClick,
  type,
  emphasis,
  className,
  hideRemoveButton,
}) => {
  return (
    <div
      className={classNames(
        'rc-tag',
        `rc-tag-${type}`,
        `rc-tag-${emphasis}`,
        className,
      )}
    >
      <div
        className={classNames('rc-tag-label-background', {
          'rc-tag-border': !hideRemoveButton,
        })}
      >
        <Text className="rc-tag-text">{label}</Text>
      </div>
      {!hideRemoveButton && (
        <Button
          className="rc-tag-remove-button"
          onClick={() => onClick()}
          icon="close"
          iconSize="small"
          aria-label="Remove tag"
        />
      )}
    </div>
  );
};

Tag.Filter = AddTagFilter;
Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
