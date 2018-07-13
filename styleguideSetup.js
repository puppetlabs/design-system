import moment from 'moment';

import 'moment/locale/en-au';
import 'moment/locale/en-gb';
import 'moment/locale/ja'; // japanese
import 'moment/locale/de'; // german

const getLocale = () => {
  const navigator = window.navigator;

  if (navigator && navigator.languages) {
    return navigator.languages[0];
  }

  return navigator.language;
};

const LOCALE_OVERRIDE = null;

moment.locale(LOCALE_OVERRIDE || getLocale());
