export const ANIMATION_TIMING = 200;

export const ENTER_KEY_CODE = 13;
export const BACK_KEY_CODE = 8;
export const TAB_KEY_CODE = 9;
export const ESC_KEY_CODE = 27;
export const LEFT_KEY_CODE = 37;
export const RIGHT_KEY_CODE = 39;
export const UP_KEY_CODE = 38;
export const DOWN_KEY_CODE = 40;
export const END_KEY_CODE = 35;
export const HOME_KEY_CODE = 36;
export const SPACE_KEY_CODE = 32;

export const SIDEBAR_SUBSECTION_TRUNC_LENGTH = 6;

export const filterOperators = [
  { symbol: '=', label: 'Equals', sentence: 'is equal to' },
  { symbol: '!=', label: "Doesn't equal", sentence: 'does not equal' },
  { symbol: '=~', label: 'Contains', sentence: 'contains' },
  { symbol: '!~', label: "Doesn't contain", sentence: 'does not contain' },
  { symbol: '>', label: 'Greater than', sentence: 'is greater than' },
  { symbol: '<', label: 'Less than', sentence: 'is less than' },
  {
    symbol: '>=',
    label: 'Greater than or equal to',
    sentence: 'is greater than or equal to',
  },
  {
    symbol: '<=',
    label: 'Less than or equal to',
    sentence: 'is less chan or equal to',
  },
  { symbol: 'null', label: 'Is null', noValue: true, sentence: 'is null' },
  {
    symbol: 'notNull',
    label: 'Is not null',
    noValue: true,
    sentence: 'is not null',
  },
];

// Icons
const tinyIcon = {
  size: '8px',
  viewBox: '0 0 8 8',
};

const smallIcon = {
  size: '12px',
  viewBox: '0 0 12 12',
};

const mediumIcon = {
  size: '16px',
  viewBox: '0 0 16 16',
};

const largeIcon = {
  size: '24px',
  viewBox: '0 0 24 24',
};

export const ICON_CONFIG = {
  tiny: tinyIcon,
  small: smallIcon,
  medium: mediumIcon,
  large: largeIcon,
};

export const STEPPER_STATES = {
  active: 'active',
  incomplete: 'incomplete',
  complete: 'complete',
};
