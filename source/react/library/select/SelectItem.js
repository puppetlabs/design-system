import React from 'react';
import classnames from 'classnames';

import Icon from '../Icon';

const propTypes = {
  highlighted: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
  value: React.PropTypes.string,
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

    this.props.onRemove();
  }

  render() {
    const className = classnames('rc-select-item', {
      'rc-select-item-highlighted': this.props.highlighted,
    });

    return (
      <div className={ className }>
        <span>{ this.props.value }</span>
        <a
          role="button"
          className="rc-select-item-close"
          onClick={ this.onRemove }
          tabIndex={ 0 }
        >
          <Icon type="close" width="8px" height="8px" />
        </a>
      </div>
    );
  }
}

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

export default SelectItem;
