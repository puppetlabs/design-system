import { CSS_PREFIX, TOTAL_SERIES_COLOR } from '../constants';

const CSS = {
  getClassName(...args) {
    const len = args.length;
    const comps = [];
    let i;

    for (i = 0; i < len; i += 1) {
      if (args[i]) {
        comps.push(`${CSS_PREFIX}-${args[i]}`);
      }
    }

    return comps.join(' ');
  },

  getColorClassName(series) {
    return this.getClassName(`color-${series % TOTAL_SERIES_COLOR}`);
  },

  getClassSelector(suffix) {
    return `.${this.getClassName(suffix).replace(' ', '.')}`;
  },
};

export default CSS;
