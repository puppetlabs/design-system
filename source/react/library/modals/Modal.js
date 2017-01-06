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
  margin: React.PropTypes.number,
  height: React.PropTypes.string,
  title: React.PropTypes.any,
  size: React.PropTypes.string,
  sidebar: React.PropTypes.any,
  actions: React.PropTypes.any,
  actionsCTA: React.PropTypes.string,
  modalClassName: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  overlayClassName: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
};

function setBodyOverflow(value) {
  const body = document.getElementsByTagName('body')[0];
  body.style.overflow = value;
}

function getDefaultState(props) {
  const state = { height: null, margin: 200 };

  if (props.margin) {
    state.margin = props.margin;
  } else if (props.height) {
    state.margin = null;
    state.height = props.height;
  }

  return state;
}

class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 250);

    this.state = getDefaultState(props);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    if (this.props.onClose && this.props.bindShortcut) {
      this.props.bindShortcut('esc', this.onClose);
    }

    setBodyOverflow('hidden');
    this.setPosition();
  }

  componentDidUpdate() {
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
    this.resetHeights();
    this.setContentHeight();
    this.setSidebarHeight();
    this.setTop();
  }

  setContentHeight() {
    let propHeight = this.state.height;
    const propMargin = this.state.margin;
    const windowHeight = window.innerHeight;
    // window padding is the amount of space we always want around the modal;
    const windowPadding = propMargin || (64 * 2);
    const modalHeight = this.getModalHeight();
    const contentHeight = this.getContentHeight();

    if (propHeight) {
      if (propHeight.match(/%$/)) {
        const multiplier = parseFloat(propHeight) / 100.0;
        propHeight = Math.floor(windowHeight * multiplier);
      } else {
        propHeight = parseFloat(propHeight);
      }

      if (modalHeight > propHeight) {
        const heightDecrease = modalHeight - propHeight;
        const newHeight = contentHeight - heightDecrease;

        this.content.style.height = `${newHeight}px`;
      } else {
        const heightIncrease = propHeight - modalHeight;
        const newHeight = heightIncrease + contentHeight;

        this.content.style.height = `${newHeight}px`;
      }
    } else if (propMargin || modalHeight > windowHeight) {
      const heightDecrease = (modalHeight - windowHeight) + windowPadding;
      this.content.style.height = `${contentHeight - heightDecrease}px`;
    }
  }

  setSidebarHeight() {
    if (this.props.sidebar) {
      const modalHeight = this.getModalHeight();
      const titleHeight = this.getTitleHeight();
      const newHeight = modalHeight - titleHeight;

      this.sidebar.style.height = `${newHeight}px`;
      this.sidebar.style.overflowY = 'scroll';
    }
  }

  setTop() {
    const windowHeight = window.innerHeight;
    const modalHeight = this.getModalHeight();
    const topPosition = (windowHeight - modalHeight) / 2;

    this.modal.style.top = `${topPosition}px`;
  }

  resetHeights() {
    if (this.content) {
      this.content.style.height = '';
    }

    if (this.sidebar) {
      this.sidebar.style.height = '';
      this.sidebar.style.overflowY = '';
    }
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
    const { actions, actionsCTA } = this.props;
    let jsx;
    let cta = null;

    if (actions) {
      if (actionsCTA) {
        cta = <span className="rc-modal-actions-cta">{ actionsCTA }</span>;
      }

      jsx = <div className="rc-modal-actions">{ cta }{ actions }</div>;
    }

    return jsx;
  }

  render() {
    const closeLink = this.renderCloseLink();
    const title = this.renderTitle();
    const sidebar = this.renderSidebar();
    const actions = this.renderActions();
    const { children, size } = this.props;
    const modalClassName = classname('rc-modal', {
      'rc-modal-with-sidebar': sidebar,
      [`rc-modal-${size}`]: size,
    }, this.props.modalClassName);
    const overlayClassName = classname('rc-modal-overlay', this.props.overlayClassName);

    return (
      <div className={ overlayClassName } >
        { closeLink }
        <div ref={ (c) => { this.modal = c; } } className={ modalClassName }>
          { title }
          { sidebar }
          <div ref={ (c) => { this.content = c; } } className="rc-modal-content">
            { children }
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
