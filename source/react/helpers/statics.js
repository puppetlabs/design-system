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

const shallowDiff = (objA, objB) =>
  Object.entries(objA).some(([key, value]) => objB[key] !== value);

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
  shallowDiff,
};

export default isNodeInRoot;
