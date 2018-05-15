import { stringify } from 'query-string';
import { compose, map, mapObjIndexed, merge, prop, uncurryN } from 'ramda';

import differenceByKey from '../../../../src/methods/differenceByKey';

/**
 * Compares a set of parsed url parameters and a Knob definition object. Returns
 * an object containing all missing url parameters and the fallback value from the Knob definition
 * @param {Object}  Knobs   Knob definition object, each having a 'fallback' default parameter
 * @param {Object}  params  Parsed url query parameters
 * @type {Object} Object containing the missing parameters and the fallback values
 */
export const getMissingParams = compose(map(prop('fallback')), differenceByKey);

/**
 * Returns a stringified query string containing params updated by provided values
 * @param {Object}  params   Parsed url query parameters
 * @param {Object}  updates  Object with key-vals to update in query params
 * @type {[type]}
 */
export const updateSearch = compose(stringify, merge);

/**
 * Iterates through the values of a knob definition object, applying the parseValue method
 * of each to the corresponding key of the parsed Url parameters
 * @param {Object}  params  Parsed url query parameters
 * @param {Object}  Knobs   Knob definition object, each having a 'fallback' default parameter
 * @type {Object} Object containing parsed url parameters
 */
export const parseValues = uncurryN(2, params =>
  compose(
    mapObjIndexed((parseValue, key) => parseValue(prop(key, params))),
    map(prop('parseValue')),
  ),
);
