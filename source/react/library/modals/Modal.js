import PropTypes from 'prop-types';
import React from 'react';
import classname from 'classnames';
import debounce from 'debounce';
import portal from '../portal';
import Icon from '../icon/Icon';
import ButtonGroup from '../buttons/ButtonGroup';
import Heading from '../heading';
import Content from '../content';

const propTypes = {
  unbindShortcut: PropTypes.func,
  bindShortcut: PropTypes.func,
  onClose: PropTypes.func,
  margin: PropTypes.number,
  /** Height in px */
  height: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  /** Content to render within sidebar */
  sidebar: PropTypes.node,
  sidebarPosition: PropTypes.oneOf(['left', 'right']),
  /** Actions to render */
  actions: PropTypes.node,
  /** Supporting text to render next to actions */
  actionsCTA: PropTypes.string,
  modalClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  overlayClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  actionsPosition: PropTypes.oneOf(['left', 'right']),
  background: PropTypes.oneOf(['transparent', 'translucent']),
  title: PropTypes.string,
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
  actionsPosition: 'left',
  background: 'transparent',
  title: '',
};

function setBodyOverflow(value) {
  const body = document.getElementsByTagName('body')[0];
  body.style.overflow = value;
}

/**
 * `Modal` renders content above the page. They can contain sidebars, either on the left or the
 * right, and come in various sizes. Actions can be rendered within the modal.
 */

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 250);

    this.state = {
      previousContentScroll: 0,
      margin: props.height ? null : props.margin,
      height: props.height,
    };
  }

  componentDidMount() {
    const { onClose, bindShortcut } = this.props;
    window.addEventListener('resize', this.onResize);

    if (onClose && bindShortcut) {
      bindShortcut('esc', this.onClose);
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
    const { onClose, unbindShortcut } = this.props;
    window.removeEventListener('resize', this.onResize);

    if (onClose && unbindShortcut) {
      unbindShortcut('esc');
    }

    setBodyOverflow('');
  }

  onResize() {
    this.setPosition();
  }

  onClose(e) {
    const { onClose } = this.props;
    e.preventDefault();

    if (onClose) {
      onClose();
    }
  }

  getModalHeight() {
    if (this.modal) {
      const { modal } = this;
      const modalRect = modal.getBoundingClientRect();

      return modalRect.height;
    }

    return 0;
  }

  getContentHeight() {
    if (this.content) {
      const { content } = this;
      const contentRect = content.getBoundingClientRect();
      return contentRect.height;
    }

    return 0;
  }

  getContentScroll() {
    let scroll = 0;

    if (this.content) {
      const { content } = this;
      scroll = content.scrollTop;
    }

    return scroll;
  }

  getSidebarHeight() {
    const { sidebar } = this.props;

    if (sidebar && this.sidebar) {
      const sidebarRect = this.sidebar.getBoundingClientRect();
      return sidebarRect.height;
    }

    return 0;
  }

  setPosition() {
    this.resetHeights();
    this.setContentHeight();
    this.setSidebarHeight();
    this.setTop();
    this.setContentScroll();
  }

  setContentHeight() {
    const { height, margin } = this.state;
    let propHeight = height;
    const propMargin = margin;
    const windowHeight = window.innerHeight;
    // window padding is the amount of space we always want around the modal;
    const windowPadding = propMargin || 64 * 2;
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
    } else if (propMargin && modalHeight > windowHeight - propMargin) {
      const heightDecrease = modalHeight - windowHeight + windowPadding;
      this.content.style.height = `${contentHeight - heightDecrease}px`;
    }
  }

  setContentScroll() {
    const { previousContentScroll } = this.state;

    this.content.scrollTop = previousContentScroll;
  }

  setSidebarHeight() {
    const { sidebar } = this.props;
    if (sidebar) {
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

  renderSidebar() {
    const { sidebar } = this.props;
    let jsx;

    if (sidebar) {
      jsx = (
        <div
          ref={c => {
            this.sidebar = c;
          }}
          className="rc-modal-sidebar"
        >
          {sidebar}
        </div>
      );
    }

    return jsx;
  }

  renderActions() {
    const { actions, actionsCTA, actionsPosition } = this.props;
    let jsx;
    let cta = null;

    if (actions) {
      if (actionsCTA) {
        cta = <span className="rc-modal-actions-cta">{actionsCTA}</span>;
      }

      const classNames = classname('rc-modal-actions', {
        [`rc-modal-actions-${actionsPosition}`]: actionsPosition,
      });

      jsx = (
        <div className={classNames}>
          {actionsPosition === 'right' ? cta : null}
          <ButtonGroup>{actions}</ButtonGroup>
          {actionsPosition === 'left' ? cta : null}
        </div>
      );
    }

    return jsx;
  }

  renderCloseLink() {
    const { onClose } = this.props;
    let jsx;

    if (onClose) {
      jsx = (
        <div
          role="presentation"
          onClick={this.onClose}
          className="rc-modal-close"
        />
      );
    }

    return jsx;
  }

  renderCloseButton() {
    const { onClose } = this.props;
    let jsx;

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    if (onClose) {
      jsx = (
        <a
          className="rc-modal-close-button"
          role="button"
          tabIndex={0}
          onClick={this.onClose}
        >
          <Icon size="medium" type="close-16px" />
        </a>
      );
    }
    /* eslint-enable */

    return jsx;
  }

  renderTitle() {
    const { title } = this.props;
    let jsx;

    if (title) {
      jsx = <Heading as="h3">{title}</Heading>;
    }

    return jsx;
  }

  render() {
    // TODO: Once we are on React 16 we should be able to remove this closeLink and add the onClick
    // directly to the wrapper. Right now ReactDOM has a hard time with this pattern.
    const title = this.renderTitle();
    const closeLink = this.renderCloseLink();
    const closeButton = this.renderCloseButton();
    const sidebar = this.renderSidebar();
    const actions = this.renderActions();
    const {
      children,
      size,
      sidebarPosition,
      background,
      modalClassName: modalClassNameProps,
      overlayClassName: overlayClassNameProps,
    } = this.props;
    const modalClassName = classname(
      'rc-modal',
      {
        'rc-modal-with-sidebar': sidebar,
        [`rc-modal-with-sidebar-${sidebarPosition}`]: sidebar,
        [`rc-modal-${size}`]: size,
      },
      modalClassNameProps,
    );
    const overlayClassName = classname(
      'rc-modal-overlay',
      {
        [`rc-modal-overlay-${background}`]: background,
      },
      overlayClassNameProps,
    );

    return (
      <div className={overlayClassName}>
        {closeLink}
        <div
          ref={c => {
            this.modal = c;
          }}
          className={modalClassName}
        >
          {sidebar}
          <div
            ref={c => {
              this.content = c;
            }}
            className="rc-modal-content"
          >
            <Content>
              {title}
              {children}
            </Content>
          </div>
          {actions}
          {closeButton}
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export { Modal as BareModal };
export default portal(Modal);
