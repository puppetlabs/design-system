const isNodeInRoot = function (node, root) {
  let contains = false;

  if (root !== node) {
    contains = root.contains(node);
  }

  return contains;
};

export {
  isNodeInRoot,
};

export default isNodeInRoot;
