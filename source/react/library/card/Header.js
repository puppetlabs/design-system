import React from 'react';
import classnames from 'classnames';

const propTypes = {
  actions: React.PropTypes.array,
  /** Primary title */
  title: React.PropTypes.string,
  /** Class to the title eelement */
  titleClassName: React.PropTypes.string,
  /** Secondary title */
  subtitle: React.PropTypes.string,
  /** Controls to update the contents of the card */
  controls: React.PropTypes.any,
};

const defaultProps = {
  actions: [],
  titleClassName: '',
  title: '',
  subtitle: '',
  controls: '',
  description: '',
};

class CardHeader extends React.Component {
  renderTitle() {
    const { title, subtitle } = this.props;
    const className = classnames('rc-card-title', this.props.titleClassName);
    let titleJSX;
    let subtitleJSX;
    let jsx = null;

    if (title || subtitle) {
      if (title) {
        titleJSX = <div key="card-title" className={ className }>{ title }</div>;
      }

      if (subtitle) {
        subtitleJSX = <div key="card-subtitle" className="rc-card-subtitle">{ subtitle }</div>;
      }

      jsx = (
        <div className="rc-card-title-area">
          { titleJSX }
          { subtitleJSX }
        </div>
      );
    }

    return jsx;
  }

  renderActions() {
    let jsx;

    if (this.props.actions.length > 0) {
      jsx = <div key="card-actions" className="rc-card-actions">{ this.props.actions }</div>;
    }

    return jsx;
  }

  renderControls() {
    const controls = this.props.controls;
    let jsx = null;

    if (controls) {
      jsx = <div key="card-controls" className="rc-card-controls">{ controls }</div>;
    }

    return jsx;
  }

  render() {
    const title = this.renderTitle();
    const actions = this.renderActions();
    const controls = this.renderControls();

    return (
      <div className="rc-card-header">
        <div className="rc-card-title-actions">
          { title }
          { actions }
        </div>
        { controls }
      </div>
    );
  }
}

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;

export default CardHeader;
