import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import { TooltipHoverArea } from './tooltips/Tooltip';

const propTypes = {
  /** Items to render inside the Tag */
  children: React.PropTypes.any,
  /** Selected state */
  selected: React.PropTypes.bool,
  className: React.PropTypes.string,
  size: React.PropTypes.string,
  block: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
  onClick: React.PropTypes.func,
  tooltip: React.PropTypes.bool,
};

/**
 * `Tag` is used to repesent a removable, clickable item.
 *
 * @example ../../../docs/Tag.md
 */
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
      jsx = (
        <Button icon="delete" transparent size="auto" onClick={ this.onRemove }>
        </Button>
      );
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

    const props = {
      className,
    };

    if (onClick) {
      props.role = 'button';
      props.onClick = this.onClick;
    }

    return (
      <div { ...props }>
        { content }
      </div>
    );
  }
}

Tag.propTypes = propTypes;

export default Tag;
