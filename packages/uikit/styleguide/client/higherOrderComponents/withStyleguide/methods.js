import { stringify } from 'query-string';
import { compose, map, merge, prop } from 'ramda';

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
