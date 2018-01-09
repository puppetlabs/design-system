import React from 'react';
import classname from 'classnames';
import debounce from 'debounce';
import { mouseTrap } from 'react-mousetrap';
import portal from '../portal';
import Icon from '../Icon';
import ButtonGroup from '../ButtonGroup';

const propTypes = {
  unbindShortcut: React.PropTypes.func,
  bindShortcut: React.PropTypes.func,
  onClose: React.PropTypes.func,
  margin: React.PropTypes.number,
  /** Height in px */
  height: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'medium']),
  /** Content to render within sidebar */
  sidebar: React.PropTypes.any,
  sidebarPosition: React.PropTypes.oneOf(['left', 'right']),
  /** Actions to render */
  actions: React.PropTypes.any,
  /** Supporting text to render next to actions */
  actionsCTA: React.PropTypes.string,
  modalClassName: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  overlayClassName: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  children: React.PropTypes.any,
};

const defaultProps = {
  unbindShortcut: null,
  bindShortcut: null,
  onClose: null,
  margin: 200,
  height: null,
  size: null,
  sidebar: null,
  actions: null,
  actionsCTA: '',
  sidebarPosition: 'right',
  modalClassName: '',
  overlayClassName: '',
  children: null,
};

function setBodyOverflow(value) {
  const body = document.getElementsByTagName('body')[0];
  body.style.overflow = value;
}

/**
 * `Modal` renders content above the page. They can contain sidebars, either on the left or the
 * right, and come in various sizes. Actions can be rendered within the modal.
 *
 * @example ../../../../docs/Modal.md
 */

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 250);

    this.state = {
      previousContentScroll: 0,
      margin: props.height ? null : props.margin,
      height: props.margin ? null : props.height,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    if (this.props.onClose && this.props.bindShortcut) {
      this.props.bindShortcut('esc', this.onClose);
    }

    setBodyOverflow('hidden');
    this.setPosition();
  }

  componentWillReceiveProps() {
    const previousContentScroll = this.getContentScroll();

    this.setState({ previousContentScroll });
  }

  componentDidUpdate() {
    this.setPosition();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);

    if (this.props.onClose && this.props.unbindShortcut) {
      this.props.unbindShortcut('esc');
    }

    setBodyOverflow('');
  }

  onResize() {
    this.setPosition();
  }

  onClose(e) {
    e.preventDefault();

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

  getContentScroll() {
    let scroll = 0;

    if (this.content) {
      const content = this.content;
      scroll = content.scrollTop;
    }

    return scroll;
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
    this.setContentScroll();
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

  setContentScroll() {
    const { previousContentScroll } = this.state;

    this.content.scrollTop = previousContentScroll;
  }

  setSidebarHeight() {
    if (this.props.sidebar) {
      const modalHeight = this.getModalHeight();
      const newHeight = modalHeight;

      this.sidebar.style.height = `${newHeight}px`;
      this.sidebar.style.overflowY = 'auto';
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
      jsx = (
        <a href="/#/close" onClick={ this.onClose } className="rc-modal-close">
          <Icon type="delete" />
        </a>
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

      jsx = (<div className="rc-modal-actions">{ cta }<ButtonGroup>{ actions }</ButtonGroup></div>);
    }

    return jsx;
  }

  render() {
    const closeLink = this.renderCloseLink();
    const sidebar = this.renderSidebar();
    const actions = this.renderActions();
    const { children, size, sidebarPosition } = this.props;
    const modalClassName = classname('rc-modal', {
      'rc-modal-with-sidebar': sidebar,
      [`rc-modal-with-sidebar-${sidebarPosition}`]: sidebar,
      [`rc-modal-${size}`]: size,
    }, this.props.modalClassName);
    const overlayClassName = classname('rc-modal-overlay', this.props.overlayClassName);

    return (
      <div className={ overlayClassName } >
        { closeLink }
        <div ref={ (c) => { this.modal = c; } } className={ modalClassName }>
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
Modal.defaultProps = defaultProps;

export { Modal as BareModal };
export default mouseTrap(portal(Modal));
