import { parse } from 'query-string';
import { shape, string } from 'prop-types';
import { isEmpty } from 'ramda';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Knobs from '../../components/Knobs';
import StyleguideContent from '../../components/StyleguideContent';
import { getMissingParams, updateSearch, parseValues } from './methods';
import styles from './controls.css';

const withControls = ({ knobs }) => Component => {
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

    return [
      <StyleguideContent key="a">
        <Component {...parseValues(params, knobs)} {...passThroughProps} />
      </StyleguideContent>,
      <div className={styles.controls} key="b">
        <Knobs knobs={knobs} />
      </div>,
    ];
  };

  WrappedComponent.propTypes = {
    location: shape({
      pathname: string,
      search: string,
    }).isRequired,
  };

  return WrappedComponent;
};

export default withControls;
