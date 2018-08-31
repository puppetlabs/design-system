import PropTypes from 'prop-types';
import React from 'react';

import Popover from '../popover/Popover';
import Icon from '../icon/Icon';

const propTypes = {
  children: PropTypes.node.isRequired,
  hint: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
  hint: '',
  width: null,
};

const renderTarget = () => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a className="rc-form-section-flyout-target">
    <Icon size="small" type="gear" />
  </a>
);

class FormFlyout extends React.Component {
  render() {
    const { children, hint, width } = this.props;
    let jsx = null;

    if (children) {
      const target = renderTarget();

      jsx = (
        <Popover
          menu
          closeButton
          className="rc-popover-visible-overflow"
          hint={hint}
          target={target}
          anchor="right top"
          margin={10}
          width={width}
        >
          <fieldset className="rc-form-section rc-form-flyout">
            {children}
          </fieldset>
        </Popover>
      );
    }

    return jsx;
  }
}

FormFlyout.propTypes = propTypes;
FormFlyout.defaultProps = defaultProps;

export default FormFlyout;
