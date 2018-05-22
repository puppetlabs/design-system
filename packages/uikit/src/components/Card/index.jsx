import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Card.css';

const Card = ({ secondary, link, className, ...props }) => {
  const Component = link ? 'a' : 'div';

  return (
    <Component
      className={classNames(
        styles.card,
        styles.primary,
        {
          [styles.secondary]: secondary,
          [styles.link]: link,
        },
        className,
      )}
      {...props}
    />
  );
};

Card.propTypes = {
  secondary: PropTypes.bool,
  link: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};

Card.defaultProps = {
  secondary: false,
  link: false,
  className: '',
};

export default Card;
