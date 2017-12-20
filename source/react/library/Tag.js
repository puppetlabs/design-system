import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import { TooltipHoverArea } from './tooltips/Tooltip';

const propTypes = {
  /** Selected state */
  selected: React.PropTypes.bool,
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'tiny']),
  block: React.PropTypes.bool,
  tooltip: React.PropTypes.bool,
  onRemove: React.PropTypes.func,
  actions: React.PropTypes.array,
  onClick: React.PropTypes.func,
  children: React.PropTypes.any,
};

const defaultProps = {
  selected: false,
  className: '',
  size: 'small',
  block: false,
  actions: null,
  tooltip: false,
  onRemove: null,
  onClick: null,
  children: null,
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
    const actions = this.renderActions();
    const { children, tooltip } = this.props;

    let jsx = (
      <div className="rc-tag-content">
        { children }
        { actions }
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

  renderActions() {
    let jsx;

    if (this.props.actions) {
      jsx = (
        <div className="rc-tag-actions">
          { this.props.actions }
        </div>
      );
    }

    return jsx;
  }

  renderRemoveButton() {
    let jsx;

    if (this.props.onRemove) {
      jsx = (
        <Button icon="delete" transparent size="auto" onClick={ this.onRemove } />
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
Tag.defaultProps = defaultProps;

export default Tag;
