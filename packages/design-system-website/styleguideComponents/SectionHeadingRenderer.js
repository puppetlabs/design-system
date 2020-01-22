import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled from 'rsg-components/Styled';
import { Heading } from '@puppet/react-components';

function SectionHeadingRenderer({ classes, children, toolbar, id, href, depth, deprecated }) {
  // Flatten both 1 and 2 depth to h1 (so that nested/categorized pages get h1)
  const headingElement = `h${Math.max(Math.min(6, depth) - 1, 1)}`;
  const sectionNameClasses = cx(classes.sectionName, {
    [classes.isDeprecated]: deprecated,
  });

  return (
    <div className={classes.wrapper}>
      <Heading as={headingElement} id={id}>
        <a href={href} className={sectionNameClasses}>
          {children}
        </a>
      </Heading>
      {/* <div className={classes.toolbar}>{toolbar}</div> */}
    </div>
  );
}

const styles = ({ color, space }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: space[1],
  },
  toolbar: {
    marginLeft: 'auto',
  },
  sectionName: {
    '&:hover, &:active': {
      isolate: false,
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  isDeprecated: {
    color: color.light,
    '&, &:hover': {
      textDecoration: 'line-through',
    },
  },
});

SectionHeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  toolbar: PropTypes.node,
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  deprecated: PropTypes.bool,
};

export default Styled(styles)(SectionHeadingRenderer);
