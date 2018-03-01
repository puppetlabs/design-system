import React from 'react';

import Tag from '../tag/Tag';

const propTypes = {
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

    return (
      <Tag
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
