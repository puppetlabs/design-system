import { parse, stringify } from 'query-string';
import { arrayOf, element, func, shape, string } from 'prop-types';
import { __, assoc, compose, map, mapObjIndexed, prop, values } from 'ramda';
import React from 'react';
import { withRouter } from 'react-router-dom';

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

  return <form>{renderKnobs(knobs)}</form>;
};

Knobs.propTypes = {
  location: shape({
    pathname: string,
    search: string,
  }).isRequired,
  history: shape({
    replace: func,
  }).isRequired,
  knobs: arrayOf(
    shape({
      fallback: string,
      Knob: element,
    }),
  ),
};

Knobs.defaultProps = {
  knobs: [],
};

export default withRouter(Knobs);
