import React from 'react';
import classname from 'classnames';
import debounce from 'debounce';
import { mouseTrap } from 'react-mousetrap';
import portal from '../portal';

const propTypes = {
  unbindShortcut: React.PropTypes.func,
  bindShortcut: React.PropTypes.func,
  onClose: React.PropTypes.func,
  children: React.PropTypes.any,
  height: React.PropTypes.string,
  title: React.PropTypes.any,
  sidebar: React.PropTypes.any,
  actions: React.PropTypes.any,
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
};

function setBodyOverflow(value) {
  const body = document.getElementsByTagName('body')[0];
  body.style.overflow = value;
}

class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 250);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    if (this.props.onClose && this.props.bindShortcut) {
      this.props.bindShortcut('esc', this.onClose);
    }

    setBodyOverflow('hidden');
    this.setPosition();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);

    if (this.props.onClose && this.props.unbindShortcut) {
      this.props.unbindShortcut('esc');
    }
  }

  onResize() {
    this.setPosition();
  }

  onClose(e) {
    e.preventDefault();

    setBodyOverflow('');

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  getModalHeight() {
    let height = 0;

    if (this.modal) {
      const modal = this.modal;
      const modalRect = modal.getBoundingClientRect();

      height = modalRect.height;
    }

    return height;
  }

  getContentHeight() {
    let height = 0;

    if (this.content) {
      const content = this.content;
      const contentRect = content.getBoundingClientRect();
      height = contentRect.height;
    }

    return height;
  }

  getTitleHeight() {
    let height = 0;

    if (this.props.title && this.title) {
      const title = this.title;
      const titleRect = title.getBoundingClientRect();

      height = titleRect.height;
    }

    return height;
  }

  getSidebarHeight() {
    let height = 0;

    if (this.props.sidebar && this.sidebar) {
      const sidebar = this.sidebar;
      const sidebarRect = sidebar.getBoundingClientRect();
      height = sidebarRect.height;
    }

    return height;
  }

  setPosition() {
    this.setContentHeight();
    this.setSidebarHeight();
    this.setTop();
  }

  setContentHeight() {
    // resetting the height and maxHeight values to start fresh
    this.content.style.maxHeight = '';
    this.content.style.height = '';

    const windowHeight = window.innerHeight;
    // window padding is the amount of space we always want around the modal;
    const windowPadding = 64 * 2;
    const modalHeight = this.getModalHeight();
    const contentHeight = this.getContentHeight();
    let propHeight = this.props.height;

    if (propHeight) {
      if (propHeight.match(/%$/)) {
        const multiplier = parseFloat(propHeight) / 100.0;
        propHeight = Math.floor(windowHeight * multiplier);
      } else {
        propHeight = parseFloat(propHeight);
      }

      if (modalHeight > propHeight) {
        const heightDecrease = modalHeight - propHeight;
        const remainder = contentHeight - heightDecrease;

        this.content.style.maxHeight = `${remainder}px`;
      } else {
        const heightIncrease = propHeight - modalHeight;
        const remainder = heightIncrease + contentHeight;

        this.content.style.height = `${remainder}px`;
      }
    } else if (modalHeight > windowHeight) {
      const heightDecrease = (modalHeight - windowHeight) + windowPadding;
      this.content.style.maxHeight = `${contentHeight - heightDecrease}px`;
    }
  }

  setSidebarHeight() {
    if (this.props.sidebar) {
      const modalHeight = this.getModalHeight();
      const titleHeight = this.getTitleHeight();

      this.sidebar.style.height = `${modalHeight - titleHeight}px`;
      this.sidebar.style.overflowY = 'scroll';
    }
  }

  setTop() {
    const windowHeight = window.innerHeight;
    const modalHeight = this.getModalHeight();
    const topPosition = (windowHeight - modalHeight) / 2;

    this.modal.style.top = `${topPosition}px`;
  }

  renderCloseLink() {
    let jsx;

    if (this.props.onClose) {
      jsx = <a href="/#/close" onClick={ this.onClose } className="rc-modal-close">Close</a>;
    }

    return jsx;
  }

  renderTitle() {
    let jsx;

    if (this.props.title) {
      jsx = (
        <div ref={ (c) => { this.title = c; } } className="rc-modal-title">
          { this.props.title }
        </div>
      );
    }

    return jsx;
  }

  renderSidebar() {
    let jsx;

    if (this.props.sidebar) {
      jsx = (
        <div
          ref={ (c) => { this.sidebar = c; } }
          className="rc-modal-sidebar"
        >
          { this.props.sidebar }
        </div>
      );
    }

    return jsx;
  }

  renderActions() {
    let jsx;

    if (this.props.actions) {
      jsx = <div className="rc-modal-actions">{ this.props.actions }</div>;
    }

    return jsx;
  }

  render() {
    const closeLink = this.renderCloseLink();
    const title = this.renderTitle();
    const sidebar = this.renderSidebar();
    const actions = this.renderActions();
    const className = classname('rc-modal', {
      'rc-modal-with-sidebar': sidebar,
    }, this.props.className);

    return (
      <div className="rc-modal-overlay">
        { closeLink }
        <div ref={ (c) => { this.modal = c; } } className={ className }>
          { title }
          { sidebar }
          <div ref={ (c) => { this.content = c; } }className="rc-modal-content">
            { this.props.children }
          </div>
          { actions }
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;

export { Modal as BareModal };
export default mouseTrap(portal(Modal));
