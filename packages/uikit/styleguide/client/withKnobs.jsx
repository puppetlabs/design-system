import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import {
  __,
  assoc,
  compose,
  curry,
  difference,
  isEmpty,
  pick,
  keys,
  path,
  merge,
  map,
  mapObjIndexed,
  prop,
  values,
} from 'ramda';
import { parse, stringify } from 'query-string';
import Button from '.';

const getValue = path(['target', 'value']);

const text = (label, fallback) => {
  const Knob = ({ value, updateValue }) => (
    <label htmlFor={label}>
      {label}
      <input
        type="text"
        id={label}
        name={label}
        value={value}
        onChange={compose(updateValue, getValue)}
      />
    </label>
  );

  Knob.propTypes = {
    value: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
  };

  return {
    fallback,
    Knob,
  };
};

const knobss = {
  taco: text('Taco', 'carnitas'),
};

/**
 * Set theory difference operation applied to object keys
 * @param {Object} a Object a
 * @param {Object} b Object b
 * @type {Object} All key - vals from object a that do not have corresponding keys in object b
 */
const differenceByKey = curry((a, b) => pick(difference(keys(a), keys(b)), a));

const getMissingParams = compose(map(prop('fallback')), differenceByKey);

const updateSearch = compose(stringify, merge);

const Knobs = withRouter(({ location, history, knobs }) => {
  const { pathname, search } = location;
  const { replace } = history;
  const params = parse(search);

  const renderKnobs = compose(
    values,
    mapObjIndexed((Knob, key) => (
      <Knob
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

  return <form>{renderKnobs(knobs)}</form>;
});

const ButtonStyleguide = ({ location, history }) => {
  const { pathname, search } = location;
  const params = parse(search);
  const missingParams = getMissingParams(knobss, params);

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
        <Button className={styles.button}>Action</Button>
        <Button disabled className={styles.button}>
          Action
        </Button>
        <Button secondary className={styles.button}>
          Action
        </Button>
        <Button secondary disabled className={styles.button}>
          Action
        </Button>
        <Button tertiary className={styles.button}>
          Action
        </Button>
        <Button tertiary disabled className={styles.button}>
          Action
        </Button>
      </div>
      <div className={styles.controls}>
        <Knobs knobs={knobss} />
      </div>
    </div>
  );
};

export default withRouter(ButtonStyleguide);
