import { parse } from 'query-string';
import { shape, string } from 'prop-types';
import { isEmpty } from 'ramda';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Knobs from '../../components/Knobs';
import { getMissingParams, updateSearch, parseValues } from './methods';
import styles from './StyleguideContainer.css';

const withStyleguide = ({ knobs }) => Component => {
  const WrappedComponent = ({ location, ...passThroughProps }) => {
    const { pathname, search } = location;
    const params = parse(search);
    const missingParams = getMissingParams(knobs, params);

    if (!isEmpty(missingParams)) {
      return (
        <Redirect
          to={{ pathname, search: updateSearch(params, missingParams) }}
        />
      );
    }

    return (
      <div className={styles.contentOuter}>
        <div className={styles.content}>
          <Component {...parseValues(params, knobs)} {...passThroughProps} />
        </div>
        <div className={styles.controls}>
          <Knobs knobs={knobs} />
        </div>
      </div>
    );
  };

  WrappedComponent.propTypes = {
    location: shape({
      pathname: string,
      search: string,
    }).isRequired,
  };

  return WrappedComponent;
};

export default withStyleguide;
