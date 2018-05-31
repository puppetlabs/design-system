import typography from '../../styles/typography.css';

const numbersClasses = {
  h1: typography.numbersH1,
  h2: typography.numbersH2,
};

const classes = {
  h1: typography.heading1,
  h2: typography.heading2,
  h3: typography.heading3,
  h4: typography.heading4,
};

/**
 * Returns the correct typography classname
 * @param  {String}   as      Header type
 * @param  {Boolean}  numbers Use numbers alternates?
 * @return {String}   className
 */
const getTypography = (as, numbers) =>
  numbers ? numbersClasses[as] : classes[as];

export default getTypography;
