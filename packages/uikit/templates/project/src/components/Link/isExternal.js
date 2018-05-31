import is from 'ramda/src/is';

const re = /^https?:\/\//;

/**
 * Determines if a url is 'external'. Currently, a url is considered external
 * if it starts with http:// or https://. This by no means captures all usecases,
 * for example you could write a valid link to a href="www.google.com", but as a
 * principle we should be using full urls when external
 * @param  {String}  url URL
 * @return {Boolean}     is the URL external?
 */
const isExternal = url => is(String) && re.test(url);

export default isExternal;
