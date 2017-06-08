import React from 'react';

const propTypes = {
  /** Primary title */
  title: React.PropTypes.string,
  /** Secondary title */
  subtitle: React.PropTypes.string,
};

class CardTitle extends React.Component {
  renderTitle() {
    const title = this.props.title;
    let jsx = null;

    if (title) {
      jsx = <div key="title" className="rc-card-title">{ title }</div>;
    }

    return jsx;
  }

  renderSubtitle() {
    const subtitle = this.props.subtitle;
    let jsx = null;

    if (subtitle) {
      jsx = <span key="subtitle" className="rc-card-subtitle">{ subtitle }</span>;
    }

    return jsx;
  }

  render() {
    const title = this.renderTitle();
    const subtitle = this.renderSubtitle();

    return (
      <div>
        { [title, subtitle] }
      </div>
    );
  }
}

CardTitle.propTypes = propTypes;

export default CardTitle;
