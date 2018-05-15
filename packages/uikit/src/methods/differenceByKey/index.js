import { curry, difference, keys, pick } from 'ramda';

/**
 * Set theory difference operation applied to object keys
 * @param {Object} a Object a
 * @param {Object} b Object b
 * @type {Object} All key - vals from object a that do not have corresponding keys in object b
 */
const differenceByKey = curry((a, b) => pick(difference(keys(a), keys(b)), a));

export default differenceByKey;
