import React from 'react';

import Popover from '../Popover';
import Icon from '../Icon';

const propTypes = {
  hint: React.PropTypes.string,
  children: React.PropTypes.any,
  width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
};

const defaultProps = {
};

const renderTarget = () => (
  <a className="rc-form-section-flyout-target">
    <Icon height="12px" width="12px" type="gear" />
  </a>
);


class FormFlyout extends React.Component {
  render() {
    let jsx = null;

    if (this.props.children) {
      const target = renderTarget();

      jsx = (
        <Popover
          menu
          closeButton
          className="rc-popover-visible-overflow"
          hint={ this.props.hint }
          target={ target }
          anchor="top right"
          margin={ 10 }
          width={ this.props.width }
        >
          <fieldset className="rc-form-section rc-form-flyout">
            { this.props.children}
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
