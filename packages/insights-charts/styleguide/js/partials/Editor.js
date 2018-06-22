import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReflectEditor from '@puppet/insights-editor';
import { setOptions } from '../store/actions';

const schema = {
  basics: {
    icon: 'data',
    fields: [
      {
        label: 'animations',
        type: 'switch',
        options: { inline: true },
        path: '$.animations',
      },
      {
        label: 'sparseness',
        type: 'number',
        options: { inline: true },
        path: '$.sparseness',
      },
    ],
  },
};

const mapStateToProps = state => ({ state });

const propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.object,
};

const defaultProps = {
  onChange: () => {},
  state: {
    options: {},
  },
};

const mapDispatchToProps = dispatch => ({
  onChange: (configuration) => {
    dispatch(setOptions(configuration));
  },
});

const Editor = (props) => {
  const options = props.state.options;
  const configuration = {
    sparseness: options.sparseness,
    animations: options.animations,
  };

  return (
    <ReflectEditor
      className="sg-editor"
      configuration={ configuration }
      schema={ schema }
      onChange={ props.onChange }
    />
  );
};

Editor.propTypes = propTypes;
Editor.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
