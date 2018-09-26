const unbindParentScroll = (element, onScroll) => {
  let parent = element.parentElement;

  while (parent) {
    parent.removeEventListener('scroll', onScroll);

    parent = parent.parentElement;
  }
};

const bindParentScroll = (element, onScroll) => {
  let parent = element.parentElement;

  while (parent) {
    parent.addEventListener('scroll', onScroll);

    parent = parent.parentElement;
  }
};

const isNodeInRoot = (node, root) => {
  let contains = false;

  if (root && root !== node) {
    contains = root.contains(node);
  }

  return contains;
};

const getKey = (child = {}, idx) => child.key || String(idx);

/**
 * Used to map a set of mutually exclusive boolean props to a single string option
 * Being able to write <Badge bold danger /> is super nice for the user, but
 * being able to code with type="bold" and color="danger" is super nice for the
 * code. This function allows us to have both
 */
const selectFirstTrue = (options, fallback) =>
  Object.keys(options).find(key => options[key]) || fallback;

const mapColumnsToText = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
};

export {
  unbindParentScroll,
  bindParentScroll,
  isNodeInRoot,
  getKey,
  mapColumnsToText,
  selectFirstTrue,
};

export default isNodeInRoot;
