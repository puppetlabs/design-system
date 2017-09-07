import React from 'react';
import classnames from 'classnames';

const propTypes = {
  /** Primary title */
  title: React.PropTypes.string.isRequired,
  /** Class to the title eelement */
  titleClassName: React.PropTypes.string,
  /** Secondary title */
  subtitle: React.PropTypes.string,
  /** Controls to update the contents of the card */
  controls: React.PropTypes.any,
  /** Description of the cards contents */
  description: React.PropTypes.string,
};

const defaultProps = {
  titleClassName: '',
  subtitle: '',
  controls: '',
  description: '',
};

class CardTitle extends React.Component {
  renderTitle() {
    const title = this.props.title;
    const className = classnames('rc-card-title', this.props.titleClassName);
    let jsx = null;

    if (title) {
      jsx = <div key="title" className={ className }>{ title }</div>;
    }

    return jsx;
  }

  renderSubtitle() {
    const subtitle = this.props.subtitle;
    let jsx = null;

    if (subtitle) {
      jsx = <div className="rc-card-subtitle">{ subtitle }</div>;
    }

    return jsx;
  }

  renderControls() {
    const controls = this.props.controls;
    let jsx = null;

    if (controls) {
      jsx = <div className="rc-card-controls">{ controls }</div>;
    }

    return jsx;
  }

  renderDescription() {
    const description = this.props.description;
    let jsx = null;

    if (description) {
      jsx = <div className="rc-card-description">{ description }</div>;
    }

    return jsx;
  }

  render() {
    const title = this.renderTitle();
    const subtitle = this.renderSubtitle();
    const controls = this.renderControls();
    const description = this.renderDescription();

    return (
      <div className="rc-card-header">
        { [title, subtitle, controls, description] }
      </div>
    );
  }
}

CardTitle.propTypes = propTypes;
CardTitle.defaultProps = defaultProps;

export default CardTitle;
