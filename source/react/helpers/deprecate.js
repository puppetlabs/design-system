import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

const getDisplayName = comp => comp.displayName || comp.name || 'Component';

/**
 * Higher order component that displays a deprecation message upon mount
 * of a given component when rendered in development
 *
 * @example
 *  deprecate({
 *    removalVersion: "5.0.0",
 *    upgradeInstructions: "Please replace with the <Card /> component."
 *  })(Panel);
 *
 * @param  {String} removalVersion      [description]
 * @param  {String} upgradeInstructions [description]
 */
const deprecate = ({
  removalVersion,
  upgradeInstructions,
}) => WrappedComponent => {
  /**
   * Don't wrap if not in development
   */
  if (process.env.NODE_ENV !== 'development') {
    return WrappedComponent;
  }

  const displayName = getDisplayName(WrappedComponent);

  class DeprecatedComponent extends Component {
    componentDidMount() {
      // eslint-disable-next-line
      console.warn(
        `${displayName} is deprecated and will be removed in react-components version ${removalVersion}. ${upgradeInstructions}`,
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  DeprecatedComponent.displayName = displayName;

  hoistStatics(DeprecatedComponent, WrappedComponent);

  return DeprecatedComponent;
};

export default deprecate;
