import { Children, cloneElement } from 'react';

/**
 * Given `children` (and their nested descendants) and `components`, return the
 * plucked descendants that are instances of any of the given `components` as
 * well as the other descendants in the original nested structure (minus plucked
 * descendants).
 *
 * @param {{children: Array|ReactNode, components: ReactElement|ReactElement[]}} parameters
 * @returns {{pluckedDescendants: Array, otherDescendants: Array}} descendants
 */
const filterDescendants = ({ children, components: component }) => {
  let pluckedDescendants = [];
  const otherDescendants = [];
  const components = Array.isArray(component) ? component : [component];

  Children.toArray(children).forEach((child) => {
    if (child.type && components.some((type) => child.type === type)) {
      pluckedDescendants.push(child);
    } else if (child.props && child.props.children) {
      const {
        pluckedDescendants: nestedPluckedDescendants,
        otherDescendants: nestedOtherDescendants,
      } = filterDescendants({ children: child.props.children, components });

      if (nestedPluckedDescendants.length > 0) {
        pluckedDescendants = pluckedDescendants.concat(
          nestedPluckedDescendants,
        );
      }

      const childWithoutPluckedDescendants = cloneElement(
        child,
        {},
        nestedOtherDescendants,
      );

      otherDescendants.push(childWithoutPluckedDescendants);
    } else {
      otherDescendants.push(child);
    }
  });

  return { pluckedDescendants, otherDescendants };
};

export default filterDescendants;
