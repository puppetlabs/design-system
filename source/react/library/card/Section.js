import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string,
};

class CardSection extends React.Component {
  render() {
    const { children, className: classProp } = this.props;
    const className = classnames('rc-card-section', classProp);

    return (
      <div className={ className } >
        { children }
      </div>
    );
  }
}

CardSection.propTypes = propTypes;

export default CardSection;
