/**
 * Returns browser locale, detected from browser navigator settings
 */
const getLocale = () => {
  if (process.env.BROWSER_LOCALE !== undefined) {
    return process.env.BROWSER_LOCALE;
  }

  if (navigator.languages) {
    return navigator.languages[0];
  }

  return navigator.language;
};

export default getLocale;
