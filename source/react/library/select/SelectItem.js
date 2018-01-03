import React from 'react';

const propTypes = {
  value: React.PropTypes.string,
};

const defaultProps = {

};

class SelectItem extends React.Component {
  render() {
    return (
      <div className="rc-select-item">
        <span>{ this.props.value }</span>
      </div>
    );
  }
}

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

export default SelectItem;
