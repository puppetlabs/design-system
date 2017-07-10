import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Input from '../Input';

const propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  onChange: () => {},
};

class CardSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();

    this.props.onChange(e.target.value);
  }

  render() {
    const className = classnames('rc-card-search', this.props.className);

    return (
      <div className={ className } >
        <Icon type="search" height={ 20 } width={ 20 } />
        <Input simple size="small" placeholder="Type to search" onChange={ this.onChange } />
      </div>
    );
  }
}

CardSearch.propTypes = propTypes;
CardSearch.defaultProps = defaultProps;

export default CardSearch;
