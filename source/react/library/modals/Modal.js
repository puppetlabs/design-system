import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Heading from '../heading';
import Icon from '../icon';
import Content from '../content';

const propTypes = {};
const defaultProps = {};

/**
 * `Modal` renders content in a dialog box above the main content of a page
 */
// class Modal extends React.Component {
//   render() {
//     return <ReactModal isOpen={false} className="ReactModal__Content" />;
//   }
// }
const Modal = () => <ReactModal isOpen className="hello-world" />;

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
