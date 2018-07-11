import PropTypes from 'prop-types';
import React from 'react';
import Button from '../buttons/Button';
import { getKey } from '../../helpers/statics';
import { SIDEBAR_SUBSECTION_TRUNC_LENGTH } from '../../constants';

const propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  /** The title of the active item */
  selected: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSubItemClick: PropTypes.func,
  /** Boolean to truncate lists w/expand button */
  truncate: PropTypes.bool,
  /** Optional method that fires when clicking "Add New" */
  onAddItem: PropTypes.func,
};

const defaultProps = {
  children: [],
  title: '',
  selected: null,
  onSubItemClick: () => {},
  truncate: false,
  onAddItem: null,
};

class Subsection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truncate: props.truncate,
    };

    this.onSubItemClick = this.onSubItemClick.bind(this);
    this.onViewMore = this.onViewMore.bind(this);
  }

  onSubItemClick(item) {
    this.props.onSubItemClick(item);
  }

  onViewMore(e) {
    e.preventDefault();

    this.setState({ truncate: false });
  }

  getItems() {
    let items = React.Children.map(this.props.children, (item, idx) => {
      const props = {
        key: getKey(item, idx),
        onSubItemClick: this.onSubItemClick,
        selected: this.props.selected,
      };

      return React.cloneElement(item, props);
    });

    if (items && items.length > SIDEBAR_SUBSECTION_TRUNC_LENGTH && this.state.truncate) {
      const jsx = <a className="rc-sidebar-subsection-view-more-link" role="button" tabIndex={ 0 } onClick={ this.onViewMore } key="view-more-link">View All...</a>;

      items = items.slice(0, SIDEBAR_SUBSECTION_TRUNC_LENGTH);
      items.push(jsx);
    }

    return items;
  }

  getAddItemBtn() {
    let jsx;

    if (this.props.onAddItem) {
      jsx = <Button className="rc-sidebar-subsection-add-item-btn" onClick={ this.props.onAddItem } floating />;
    }

    return jsx;
  }

  render() {
    const items = this.getItems();
    const addItemBtn = this.getAddItemBtn();

    return (
      <div className="rc-sidebar-subsection">
        <div className="rc-sidebar-subsection-header">
          <span className="rc-sidebar-subsection-title">
            { this.props.title }
          </span>
          { addItemBtn }
        </div>
        <div className="rc-sidebar-subsection-items">
          { items }
        </div>
      </div>
    );
  }
}

Subsection.propTypes = propTypes;
Subsection.defaultProps = defaultProps;

export default Subsection;
