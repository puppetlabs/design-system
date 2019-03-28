import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  actions: PropTypes.node,
  /** Primary title */
  title: PropTypes.node,
  /** Class to the title eelement */
  titleClassName: PropTypes.string,
  /** Secondary title */
  subtitle: PropTypes.node,
  /** Controls to update the contents of the card */
  controls: PropTypes.node,
  /** Card description */
  description: PropTypes.string,
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
    const {
      title,
      subtitle,
      controls,
      description,
      titleClassName,
    } = this.props;
    const className = classnames('rc-card-title', titleClassName);
    let titleJSX;
    let subtitleJSX;
    let controlsJSX;
    let descriptionJSX;
    let jsx = null;

    if (title || subtitle || controls || description) {
      if (title) {
        titleJSX = (
          <div key="card-title" className={className}>
            {title}
          </div>
        );
      }

      if (subtitle) {
        subtitleJSX = (
          <div key="card-subtitle" className="rc-card-subtitle">
            {subtitle}
          </div>
        );
      }

      if (controls) {
        controlsJSX = (
          <div key="card-controls" className="rc-card-controls">
            {controls}
          </div>
        );
      }

      if (description) {
        descriptionJSX = (
          <div key="card-description" className="rc-card-description">
            {description}
          </div>
        );
      }

      jsx = (
        <div key="card-title-area" className="rc-card-title-area">
          {titleJSX}
          {subtitleJSX}
          {controlsJSX}
          {descriptionJSX}
        </div>
      );
    }

    return jsx;
  }

  renderActions() {
    const { actions } = this.props;
    let jsx;

    if (actions && actions.length > 0) {
      jsx = (
        <div key="card-actions" className="rc-card-actions">
          {actions}
        </div>
      );
    }

    return jsx;
  }

  render() {
    const title = this.renderTitle();
    const actions = this.renderActions();

    return (
      <div className="rc-card-header">
        <div className="rc-card-title-actions">
          {title}
          {actions}
        </div>
      </div>
    );
  }
}

CardHeader.propTypes = propTypes;
CardHeader.defaultProps = defaultProps;

export default CardHeader;
