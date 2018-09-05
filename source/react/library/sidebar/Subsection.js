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
  title: PropTypes.string,
  /** Whether or not the current subsection is selected */
  selected: PropTypes.bool,
  /** The title of the active item */
  selectedItem: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSubItemClick: PropTypes.func,
  /** Boolean to truncate lists w/expand button */
  truncate: PropTypes.bool,
  /** Callback for when section is clicked */
  onSubsectionClick: PropTypes.func,
  onClick: PropTypes.func,
  onViewMore: PropTypes.func,
};

const defaultProps = {
  children: [],
  onClick: () => {},
  title: '',
  selected: false,
  selectedItem: null,
  onSubItemClick: () => {},
  truncate: false,
  onSubsectionClick: () => {},
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
    const { title, onSubsectionClick, onClick } = this.props;
    onSubsectionClick(title);
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
    const { selected, children, selectedItem, truncate } = this.props;
    let items = [];

    if (selected) {
      items = React.Children.map(children, (item, idx) => {
        const props = {
          key: getKey(item, idx),
          onSubItemClick: this.onSubItemClick,
          selected: selectedItem,
        };

        return React.cloneElement(item, props);
      });
    }

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
        />
      );

      items = items.slice(0, SIDEBAR_SUBSECTION_TRUNC_LENGTH);
      items.push(jsx);
    }

    return items;
  }

  render() {
    const items = this.getItems();

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <ul className="rc-sidebar-level-2">{items}</ul>
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );
  }
}

Subsection.propTypes = propTypes;
Subsection.defaultProps = defaultProps;

export default Subsection;
