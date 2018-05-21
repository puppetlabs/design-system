import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Card.css';

const Card = ({ link, className, ...props }) => {
  const Component = link ? 'a' : 'div';

  return (
    <Component
      className={classNames(
        styles.card,
        {
          [styles.link]: link,
        },
        className,
      )}
      {...props}
    />
  );
};

Card.propTypes = {
  link: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};

Card.defaultProps = {
  link: false,
  className: '',
};

export default Card;
