import React from 'react';
import classnames from 'classnames';

import Tag from '../tag/Tag';

const propTypes = {
  highlighted: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
  value: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'medium']),
};

const defaultProps = {
  highlighted: false,
  onRemove: () => {},
  value: null,
  size: 'tiny',
};

class SelectItem extends React.Component {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(e) {
    e.stopPropagation();

    this.props.onRemove();
  }

  render() {
    const size = this.props.size === 'small' ? 'tiny' : this.props.size;
    const className = classnames({
      'rc-tag-highlighted': this.props.highlighted,
    });

    return (
      <Tag
        className={ className }
        size={ size }
        round
        primary
        onRemove={ this.onRemove }
      >
        { this.props.value }
      </Tag>
    );
  }
}

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

export default SelectItem;
