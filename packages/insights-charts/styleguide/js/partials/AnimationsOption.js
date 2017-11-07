import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setOption } from '../store/actions';

const propTypes = {
  animations: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const AnimationsOption = ({ animations, onChange }) => (
  <input type="checkbox" checked={ animations } onChange={ onChange } />
);

AnimationsOption.propTypes = propTypes;

const mapStateToProps = state => ({
  animations: state.options.animations,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => {
    dispatch(setOption('animations', event.target.checked));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimationsOption);
