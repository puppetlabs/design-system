import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

const propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string,
  onRemove: React.PropTypes.func,
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

  render() {
    const { children, className: classProp } = this.props;
    const className = classnames('rc-card-actions', classProp);
    const remove = this.renderRemove();

    return (
      <div className={ className } >
        { remove }
        { children }
      </div>
    );
  }
}

CardActions.propTypes = propTypes;

export default CardActions;
