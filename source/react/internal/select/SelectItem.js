import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Tag from '../tag/Tag';

const propTypes = {
  highlighted: PropTypes.bool,
  onRemove: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  highlighted: false,
  onRemove: () => {},
  value: null,
};

class SelectItem extends React.Component {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(e) {
    e.stopPropagation();
    const { onRemove } = this.props;

    onRemove();
  }

  render() {
    const { highlighted, value } = this.props;
    const className = classnames({
      'rc-tag-highlighted': highlighted,
    });

    return (
      <Tag className={className} onRemove={this.onRemove}>
        {value}
      </Tag>
    );
  }
}

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

export default SelectItem;
