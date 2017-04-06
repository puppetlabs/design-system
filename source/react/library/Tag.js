import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';
import { TooltipHoverArea } from './tooltips/Tooltip';

const propTypes = {
  children: React.PropTypes.any,
  selected: React.PropTypes.bool,
  className: React.PropTypes.string,
  size: React.PropTypes.string,
  block: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
  onClick: React.PropTypes.func,
  tooltip: React.PropTypes.bool,
};

class Tag extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.props.onClick) {
      const value = !this.props.selected ? this.props.children : null;
      this.props.onClick(value);
    }
  }

  onRemove(e) {
    e.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  renderContent() {
    const removeButton = this.renderRemoveButton();
    const { children, tooltip } = this.props;
    let jsx = (
      <div className="rc-tag-content">
        { children }
        { removeButton }
      </div>
    );

    if (tooltip) {
      jsx = (
        <TooltipHoverArea anchor="bottom" tooltip={ jsx }>
          { jsx }
        </TooltipHoverArea>
      );
    }

    return jsx;
  }

  renderRemoveButton() {
    let jsx;

    if (this.props.onRemove) {
      jsx = <Icon type="delete" height="12px" width="12px" onClick={ this.onRemove } />;
    }

    return jsx;
  }

  render() {
    const { onRemove, onClick, selected, size, block } = this.props;
    const className = classnames('rc-tag', {
      'rc-tag-selected': selected,
      'rc-tag-selectable': onClick,
      'rc-tag-removable': onRemove,
      'rc-tag-block': block,
      [`rc-tag-${size}`]: size,
    }, this.props.className);
    const content = this.renderContent();
    let jsx;

    if (onClick) {
      jsx = (
        <a onClick={ this.onClick } href="" className={ className }>
          { content }
        </a>
      );
    } else {
      jsx = (
        <div className={ className }>
          { content }
        </div>
      );
    }

    return jsx;
  }
}

Tag.propTypes = propTypes;

export default Tag;
