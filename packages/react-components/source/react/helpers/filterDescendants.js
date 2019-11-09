import { Children, cloneElement } from 'react';

/**
 * Given `children` and `filter` (a function that is passed `child.type.name`),
 * return the plucked descendants (even if they were nested) as a flat array
 * that match the filter criteria as well as the other descendants (in the
 * original nested structure) minus the plucked descendants.
 *
 * @returns {Object} An object with `pluckedDescendants` and `otherDescendants`
 */
const filterDescendants = ({ children, filter }) => {
  let pluckedDescendants = [];
  const otherDescendants = [];

  Children.forEach(children, child => {
    if (filter(child.type && child.type.name)) {
      pluckedDescendants.push(child);
    } else if (child.props && child.props.children) {
      const {
        pluckedDescendants: nestedPluckedDescendants,
        otherDescendants: nestedOtherDescendants,
      } = filterDescendants({
        children: child.props.children,
        filter,
      });

      if (nestedPluckedDescendants.length > 0) {
        pluckedDescendants = pluckedDescendants.concat(
          nestedPluckedDescendants,
        );
      }

      const childWithoutPluckedDescendants = cloneElement(
        child,
        [],
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
