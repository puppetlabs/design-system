import React from 'react';
import Button from './Button';
import Icon from './Icon';
import DropdownMenu from './dropdown/DropdownMenu';

const propTypes = {
  onClick: React.PropTypes.func.isRequired,
  onOptionClick: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
};

class SplitButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  onOptionClick(selected) {
    const option = selected[0];

    if (this.props.onOptionClick && typeof option !== 'undefined') {
      this.props.onOptionClick(option);
    }
  }

  renderDropdownTarget() {
    return (
      <Button className="rc-button-menu">
        <div className="rc-button-menu-inner">
          <Icon height={ '20px' } width={ '20px' } type="chevron-down" />
        </div>
      </Button>
    );
  }

  renderDropdown() {
    const target = this.renderDropdownTarget();
    const options = this.props.options;

    return (
      <DropdownMenu
        anchor="bottom right"
        margin={ 5 }
        selected={ [] }
        onChange={ this.onOptionClick }
        target={ target }
        options={ options }
      />
    );
  }

  render() {
    const dropdown = this.renderDropdown();
    const { label } = this.props;

    return (
      <div className="rc-split-button">
        <Button onClick={ this.onClick } label={ label } className="rc-button-main" />
        { dropdown }
      </div>
    );
  }
}

SplitButton.propTypes = propTypes;

export default SplitButton;
