import i18n from 'i18next';
import XHRBackend from 'i18next-xhr-backend';

import getLocale from 'methods/getLocale';

/**
 * Simplified locale detector that also allows env variable override.
 * Since we are unlikely to have separate translations for
 * locales within a language, strips country codes (e.g. en-US -> en)
 * @see https://www.i18next.com/misc/creating-own-plugins#languagedetector
 */
const stripSuffix = lng => lng && lng.split('-')[0];

const lngDetector = {
  type: 'languageDetector',
  init() {},
  detect: () => stripSuffix(getLocale()),
  cacheUserLanguage: lng => lng,
};

i18n
  .use(XHRBackend)
  .use(lngDetector)
  .init({
    debug: process.env !== 'production',
    fallbackLng: 'en',
    /* Translation namespaces corresponding to json files in locales/<lng>
     * You may wish to have a namespace per view */
    ns: ['common', 'home'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  });

export default i18n;
