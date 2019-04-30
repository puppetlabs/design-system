import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons/Button';

const propTypes = {};

const defaultProps = {};

const Panel = ({ content, ...props }) => <div {...props}>{content}</div>;

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
