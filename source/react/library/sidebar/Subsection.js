import PropTypes from 'prop-types';
import React from 'react';
import { getKey } from '../../helpers/statics';
import {
  SIDEBAR_SUBSECTION_TRUNC_LENGTH,
  ENTER_KEY_CODE,
} from '../../constants';
import SubsectionItem from './SubsectionItem';

const propTypes = {
  children: PropTypes.node,
  /** The title of the active item */
  selectedItem: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSubItemClick: PropTypes.func,
  /** Boolean to truncate lists w/view more button */
  truncate: PropTypes.bool,
  onClick: PropTypes.func,
  onViewMore: PropTypes.func,
};

const defaultProps = {
  children: [],
  onClick: () => {},
  selectedItem: null,
  onSubItemClick: () => {},
  truncate: false,
  onViewMore: () => {},
};

class Subsection extends React.Component {
  constructor(props) {
    super(props);

    this.onSubItemClick = this.onSubItemClick.bind(this);
    this.onViewMore = this.onViewMore.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyDownViewMore = this.onKeyDownViewMore.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClick();
    }
  }

  onClick() {
    const { onClick } = this.props;
    onClick();
  }

  onKeyDownViewMore(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onViewMore(e);
    }
  }

  onSubItemClick(item) {
    const { onSubItemClick } = this.props;

    onSubItemClick(item);
  }

  onViewMore() {
    const { onViewMore } = this.props;

    onViewMore();
  }

  getItems() {
    const { children, selectedItem, truncate } = this.props;

    let items = React.Children.map(children, (item, idx) => {
      const props = {
        key: getKey(item, idx),
        onSubItemClick: this.onSubItemClick,
        selected: selectedItem,
      };

      return React.cloneElement(item, props);
    });

    if (truncate) {
      const jsx = (
        <SubsectionItem
          className="rc-sidebar-view-more-item"
          key="view-more-link"
          selected={selectedItem}
          onClick={this.onViewMore}
          onKeyDown={this.onKeyDownViewMore}
          onSubItemClick={this.onSubItemClick}
          title="View all reports..."
          truncate={false}
        />
      );

      items = items.slice(0, SIDEBAR_SUBSECTION_TRUNC_LENGTH);
      items.push(jsx);
    }

    return items;
  }

  render() {
    const items = this.getItems();

    return <ul className="rc-sidebar-level-2">{items}</ul>;
  }
}

Subsection.propTypes = propTypes;
Subsection.defaultProps = defaultProps;

export default Subsection;
