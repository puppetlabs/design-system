import typography from '../../styles/typography.css';

/**
 * Returns the correct typography classname
 * @param  {Boolean} small     Is link small
 * @param  {Boolean} secondary Is link secondary
 * @return {String}  Correct typographic classname
 */
const getTypography = (small, secondary) => {
  if (small) {
    return secondary
      ? typography.bodyLinkSecondarySmall
      : typography.bodyLinkSmall;
  }

  return secondary ? typography.bodyLinkSecondary : typography.bodyLink;
};

export default getTypography;
