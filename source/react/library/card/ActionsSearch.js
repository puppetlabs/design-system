import PropTypes from 'prop-types';
import React from 'react';
import { ENTER_KEY_CODE } from '../../constants';
import Icon from '../icon/Icon';
import Input from '../input/Input';

const propTypes = {
  onSearch: PropTypes.func,
};

const defaultProps = {
  onSearch: () => {},
};

class CardActionsSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
    };

    this.onSearchBlur = this.onSearchBlur.bind(this);
    this.onSearchKeyUp = this.onSearchKeyUp.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  onSearchBlur(e) {
    const value = e.target.value;

    // If they clear then click out, remove the search.
    if (value === '') {
      this.props.onSearch(null);
    }
  }

  onSearchKeyUp(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      const value = e.target.value;

      this.props.onSearch(value);
    }
  }

  toggleSearch() {
    this.setState({ searching: !this.state.searching });
  }

  renderInput() {
    let jsx;

    if (this.state.searching) {
      jsx = (
        <Input
          autoFocus
          onBlur={this.onSearchBlur}
          onKeyUp={this.onSearchKeyUp}
          size="tiny"
          placeholder="Type and hit enter to search"
          onChange={this.onChange}
        />
      );
    }

    return jsx;
  }

  render() {
    const input = this.renderInput();

    return (
      <div className="rc-card-action rc-card-search">
        <a tabIndex="0" role="button" onClick={this.toggleSearch}>
          <Icon type="search" height="16px" width="16px" />
        </a>
        {input}
      </div>
    );
  }
}

CardActionsSearch.propTypes = propTypes;
CardActionsSearch.defaultProps = defaultProps;

export default CardActionsSearch;
