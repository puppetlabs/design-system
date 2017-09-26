import React from 'react';
import Icon from '../Icon';
import DropdownMenu from '../dropdown/DropdownMenu';

const propTypes = {
  menuToggleIcon: React.PropTypes.string,
  menuOptions: React.PropTypes.array,
  onOptionClick: React.PropTypes.func,
};

const defaultProps = {
  menuToggleIcon: 'kebab',
  menuOptions: [],
  onOptionClick: () => {},
};

const CardActionsMenu = (props) => {
  let menu;

  if (props.menuOptions.length > 0) {
    const width = props.menuToggleIcon === 'kebab' ? 4 : 16;

    const target = (
      <a>
        <Icon type={ props.menuToggleIcon } height="16" width={ width } />
      </a>
    );

    menu = (
      <DropdownMenu
        size="tiny"
        anchor="bottom right"
        target={ target }
        options={ props.menuOptions }
        onChange={ props.onOptionClick }
      />
    );
  }

  return (
    <div className="rc-card-action" >
      { menu }
    </div>
  );
};

CardActionsMenu.propTypes = propTypes;
CardActionsMenu.defaultProps = defaultProps;

export default CardActionsMenu;
