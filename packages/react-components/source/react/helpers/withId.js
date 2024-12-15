import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

const getDisplayName = (comp) => comp.displayName || comp.name || 'Component';

let idCount = 0;

const getId = () => {
  idCount += 1;

  return `rcid-${idCount}`;
};

/**
 * Higher order component that generates a unique id
 */
const withId = (WrappedComponent) => {
  const displayName = getDisplayName(WrappedComponent);

  class ComponentWithId extends Component {
    constructor(props) {
      super(props);

      this.id = getId();
    }

    render() {
      return <WrappedComponent id={this.id} {...this.props} />;
    }
  }

  ComponentWithId.displayName = displayName;

  hoistStatics(ComponentWithId, WrappedComponent);

  return ComponentWithId;
};

export default withId;
