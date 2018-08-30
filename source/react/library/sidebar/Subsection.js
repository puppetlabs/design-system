import PropTypes from 'prop-types';
import React from 'react';
import Button from '../buttons/Button';
import { getKey } from '../../helpers/statics';
import {
  SIDEBAR_SUBSECTION_TRUNC_LENGTH,
  ENTER_KEY_CODE,
} from '../../constants';

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
  /** Optional method that fires when clicking "Add New" */
  onAddItem: PropTypes.func,
  /** CTA to use for the add item button */
  addItemCTA: PropTypes.string,
  /** Callback for when section is clicked */
  onSubsectionClick: PropTypes.func,
  onClick: PropTypes.func,
};

const defaultProps = {
  children: [],
  onClick: () => {},
  title: '',
  selected: false,
  selectedItem: null,
  onSubItemClick: () => {},
  truncate: false,
  onAddItem: null,
  addItemCTA: 'Add item',
  onSubsectionClick: () => {},
};

class Subsection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truncate: props.truncate,
    };

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

  onViewMore(e) {
    e.preventDefault();

    this.setState({ truncate: false });
  }

  getItems() {
    const { selected, children, selectedItem } = this.props;
    const { truncate } = this.state;
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

    if (items.length > SIDEBAR_SUBSECTION_TRUNC_LENGTH && truncate) {
      const jsx = (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className="rc-sidebar-subsection-view-more-link"
          role="button"
          tabIndex={0}
          onClick={this.onViewMore}
          onKeyDown={this.onKeyDownViewMore}
          key="view-more-link"
        >
          View All...
        </a>
      );

      items = items.slice(0, SIDEBAR_SUBSECTION_TRUNC_LENGTH);
      items.push(jsx);
    }

    return items;
  }

  getAddItemBtn() {
    const { onAddItem, addItemCTA } = this.props;
    let jsx;

    if (onAddItem) {
      jsx = (
        <Button
          size="tiny"
          secondary
          className="rc-sidebar-subsection-add-item-btn"
          onClick={onAddItem}
        >
          {addItemCTA}
        </Button>
      );
    }

    return jsx;
  }

  render() {
    const items = this.getItems();
    const addItemBtn = this.getAddItemBtn();
    const { title } = this.props;

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <div className="rc-sidebar-subsection">
        <a
          role="button"
          tabIndex={0}
          className="rc-sidebar-subsection-header-link"
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          <span className="rc-sidebar-subsection-title">{title}</span>
        </a>
        <div className="rc-sidebar-subsection-items">
          {items}
          {addItemBtn}
        </div>
      </div>
      /* eslint-enable jsx-a11y/anchor-is-valid */
    );
  }
}

Subsection.propTypes = propTypes;
Subsection.defaultProps = defaultProps;

export default Subsection;
