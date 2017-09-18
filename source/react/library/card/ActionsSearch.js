import React from 'react';
import Icon from '../Icon';
import Input from '../Input';

const propTypes = {
  onChange: React.PropTypes.func,
};

const defaultProps = {
  onChange: () => {},
};

class CardSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
    };

    this.onChange = this.onChange.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  onChange(e) {
    e.preventDefault();

    this.props.onChange(e.target.value);
  }

  toggleSearch() {
    this.setState({ searching: !this.state.searching });
  }

  render() {
    const inputStyles = {
      display: this.state.searching ? 'block' : 'none',
    };

    return (
      <div className="rc-card-action rc-card-search">
        <a role="button" onClick={ this.toggleSearch }>
          <Icon type="search" height="16" width="16" />
        </a>
        <Input
          size="tiny"
          style={ inputStyles }
          placeholder="Type to search"
          onChange={ this.onChange }
        />
      </div>
    );
  }
}

CardSearch.propTypes = propTypes;
CardSearch.defaultProps = defaultProps;

export default CardSearch;
