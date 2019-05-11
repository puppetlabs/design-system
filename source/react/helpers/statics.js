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
  Object.entries(objA).some(([key, value]) => objB[key] !== value) ||
  Object.entries(objB).some(([key, value]) => objA[key] !== value);

const mapObj = (obj, fn) => {
  const mappedObj = {};

  Object.entries(obj).forEach(([key, value]) => {
    mappedObj[key] = fn(value);
  });

  return mappedObj;
};

/**
 * When using react-hot-loader, all components are actually proxied to another
 * type. This makes the strict equality check on the Type fail, but luckily they
 * extend the class in their proxy, so we can check against the prototype.
 *
 * @see https://github.com/gaearon/react-hot-loader/issues/304
 */
const componentHasType = (component, Type) =>
  component &&
  component.type &&
  (component.type === Type || component.type.prototype instanceof Type);

const omit = (keys, object) => {
  const keySet = new Set(keys);
  const newObject = {};

  Object.keys(object)
    .filter(key => !keySet.has(key))
    .forEach(key => {
      newObject[key] = object[key];
    });

  return newObject;
};

/**
 * Getter method for nested values that won't NPE
 *
 * @exmaple path(['one', 'two'], { one: { two: 'hi' } }) => 'hi';
 * @exmaple path(['three', 'two'], { one: { two: 'hi' } }) => undefined;
 */
const path = (valuePath, object) => {
  const [prop, ...rest] = valuePath;
  const nextObj = object[prop];

  if (!nextObj || !rest.length) {
    return nextObj;
  }

  return path(rest, object[prop]);
};

const getDropdownPosition = (target, anchor, margin) => {
  const { width, height } = target.getBoundingClientRect();

  switch (anchor) {
    case 'bottom right': {
      return {
        top: height + margin,
        right: 0,
        width,
      };
    }
    case 'top right': {
      return {
        bottom: height + margin,
        right: 0,
        width,
      };
    }
    case 'top left': {
      return {
        bottom: height + margin,
        left: 0,
        width,
      };
    }
    default:
    case 'bottom left': {
      return {
        top: height + margin,
        left: 0,
        width,
      };
    }
  }
};

export {
  unbindParentScroll,
  bindParentScroll,
  isNodeInRoot,
  getKey,
  shallowDiff,
  componentHasType,
  mapObj,
  omit,
  path,
  getDropdownPosition,
};

export default isNodeInRoot;
