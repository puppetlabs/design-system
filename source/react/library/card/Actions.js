import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Button from '../Button';
import DropdownMenu from '../dropdown/DropdownMenu';

const propTypes = {
  children: React.PropTypes.object,
  secondary: React.PropTypes.bool,
  menuToggleIcon: React.PropTypes.string,
  menuOptions: React.PropTypes.object,
  onOptionClick: React.PropTypes.func,
  className: React.PropTypes.string,
  onRemove: React.PropTypes.func,
};

const defaultProps = {
  secondary: false,
  className: '',
  menuToggleIcon: 'kebab',
  menuOptions: [],
  onOptionClick: () => {},
};

class CardActions extends React.Component {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(e) {
    e.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  renderRemove() {
    let jsx;

    if (this.props.onRemove) {
      const className = 'rc-card-remove rc-card-actions-hidden';

      jsx = (
        <a href="" className={ className } onClick={ this.onRemove }>
          <Icon width="11" height="11" type="close" />
        </a>
      );
    }

    return jsx;
  }

  renderActionMenu() {
    let jsx;

    if (this.props.menuOptions.length > 0) {
      const target = <Button transparent icon={ this.props.menuToggleIcon } size="tiny" />;

      jsx = (
        <DropdownMenu
          disablePortal
          size="tiny"
          anchor="bottom right"
          target={ target }
          options={ this.props.menuOptions }
          onChange={ this.props.onOptionClick }
        />
      );
    }

    return jsx;
  }

  render() {
    const { children, className: classProp } = this.props;
    const className = classnames('rc-card-actions', {
      'rc-card-actions-secondary': this.props.secondary,
    }, classProp);
    const remove = this.renderRemove();
    const actionMenu = this.renderActionMenu();

    return (
      <div className={ className } >
        { remove }
        { children }
        { actionMenu }
      </div>
    );
  }
}

CardActions.propTypes = propTypes;
CardActions.defaultProps = defaultProps;

export default CardActions;
