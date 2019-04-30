import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../buttons/Button';

//needs to have a title, because it needs a unique id
const propTypes = {};

const defaultProps = {};

class Tab extends React.Component {
  componentWillUpdate(newProps) {
    const { focus } = newProps;

    console.log(focus, newProps.id)

    if (focus) {
      this.tab.focus();
    }
  }

  render() {
    const { id, ...rest } = this.props;

    return (
      <Button
        id={id}
        ref={button => {
          this.tab = button;
        }}
        {...rest}
      >
        {id}
      </Button>
    );
  }
}

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
