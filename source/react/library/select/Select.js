import React from 'react';
import classnames from 'classnames';
import Input from '../Input';

const propTypes = {
  placeholder: React.PropTypes.string,
  autoOpen: React.PropTypes.bool,
};

const defaultProps = {
  autoOpen: false,
};

/**
 * `Select` allows the user to select things
 */
class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.autoOpen,
    };
  }

  componentDidMount() {
    if (this.props.autoOpen) {
      this.input.focus();
    }
  }

  renderMenu() {
    let jsx;

    if (this.state.open) {
      const options = this.props.options.map(o => {
        return <div className="rc-select-menu-item">{ o }</div>
      });

      jsx = (
        <div className="rc-select-menu">
          { options }
        </div>
      );
    }

    return jsx;
  }

  renderInput() {
    return (
      <Input
        ref={ (c) => { this.input = c; } }
        focused={ this.state.open }
        onFocus={ () => this.setState({ open: true }) }
        onBlur={ () => this.setState({ open: false }) }
        placeholder={ this.props.placeholder }
      />
    );
  }

  render() {
    const menu = this.renderMenu();
    const input = this.renderInput();
    const className = classnames('rc-select', this.props.className, {
      open: this.state.open,
    });

    return (
      <div className={ className }>
        { input }
        { menu }
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select
