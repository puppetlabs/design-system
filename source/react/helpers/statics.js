export function isNodeInRoot(node, root) {
  let contains = false;

  if (root !== node) {
    contains = root.contains(node);
  }

  return contains;
}
