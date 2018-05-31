import { parse, stringify } from 'query-string';
import { any, func, objectOf, shape, string } from 'prop-types';
import { __, assoc, compose, map, mapObjIndexed, prop, values } from 'ramda';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './knobs.css';

const Knobs = ({ location, history, knobs }) => {
  const { pathname, search } = location;
  const { replace } = history;

  const params = parse(search);

  const renderKnobs = compose(
    values,
    mapObjIndexed((Knob, key) => (
      <Knob
        key={key}
        value={prop(key, params)}
        updateValue={compose(
          replace,
          assoc('search', __, { pathname }),
          stringify,
          assoc(key, __, params),
        )}
      />
    )),
    map(prop('Knob')),
  );

  return (
    <div className={styles.knobs}>
      <form>
        <div className={styles.heading3}>Knobs</div>
        {renderKnobs(knobs)}
      </form>
    </div>
  );
};

Knobs.propTypes = {
  location: shape({
    pathname: string,
    search: string,
  }).isRequired,
  history: shape({
    replace: func,
  }).isRequired,
  knobs: objectOf(
    shape({
      fallback: any,
      Knob: func,
    }),
  ),
};

Knobs.defaultProps = {
  knobs: [],
};

export default withRouter(Knobs);
